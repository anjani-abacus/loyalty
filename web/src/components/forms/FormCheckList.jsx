import React, { useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";

function StateChecklist({ setStateAreas, fetchDistrictList, title, items = [], selectedItems = [], onChange }) {
  const handleToggle = (item) => {
    const isSelecting = !selectedItems.includes(item);

    if (isSelecting) {
      fetchDistrictList({ state_name: item }, {
        onSuccess: (resp) => {
          setStateAreas(prev => ({
            ...prev,
            [item]: resp?.data || []
          }));
        }
      });
    }

    const updated = isSelecting
      ? [...selectedItems, item]
      : selectedItems.filter((i) => i !== item);
    onChange?.(updated);
  };

  return (
    <div className="w-[280px] bg-background text-foreground border border-border rounded-lg p-2">
      <h3 className="text-sm font-semibold text-foreground mb-2">{title}</h3>
      <div className="max-h-[300px] overflow-y-auto border rounded-lg">
        {(!items || items.length === 0) ? (
          <div className="text-center py-4 text-sm text-muted-foreground">No items available</div>
        ) : (
          items.map((item, index) => {
            const isSelected = selectedItems.includes(item);
            return (
              <div
                key={item}
                onClick={() => handleToggle(item)}
                className={`flex items-center gap-2 px-3 py-2 cursor-pointer select-none border-b last:border-b-0 hover:bg-muted transition-colors
                  ${isSelected ? "bg-primary/10 font-medium" : "odd:bg-section-background even:bg-card"}`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}} // controlled via row click
                  className="pointer-events-none shrink-0"
                />
                <span className="text-sm truncate" title={item}>
                  {index + 1}. {item}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}


function DistrictChecklist({ title, groupedItems = {}, selectedItems = [], onChange }) {
  const handleToggle = (item) => {
    const updated = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];
    onChange?.(updated);
  };

  const allDistricts = Object.values(groupedItems).flat();
  const hasItems = allDistricts.length > 0;
  const hasStates = Object.keys(groupedItems).length > 0;

  return (
    <div className="w-[280px] bg-background text-foreground border border-border rounded-lg p-2">
      <h3 className="text-sm font-semibold text-foreground mb-2">{title}</h3>
      <div className="max-h-[300px] overflow-y-auto border rounded-lg">
        {!hasStates ? (
          <div className="text-center py-4 text-sm text-muted-foreground">Select a state first</div>
        ) : !hasItems ? (
          <div className="text-center py-4 text-sm text-muted-foreground">Loading districts…</div>
        ) : (
          Object.entries(groupedItems).map(([state, districts]) => (
            <React.Fragment key={state}>
              <div className="px-3 py-1 text-xs font-semibold bg-muted text-muted-foreground uppercase tracking-wide">
                {state}
              </div>
              {districts.map((item, index) => {
                const isSelected = selectedItems.includes(item);
                return (
                  <div
                    key={item}
                    onClick={() => handleToggle(item)}
                    className={`flex items-center gap-2 px-3 py-2 cursor-pointer select-none border-b last:border-b-0 hover:bg-muted transition-colors
                      ${isSelected ? "bg-primary/10 font-medium" : "odd:bg-section-background even:bg-card"}`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="pointer-events-none shrink-0"
                    />
                    <span className="text-sm truncate" title={item}>
                      {index + 1}. {item}
                    </span>
                  </div>
                );
              })}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
}

export default function StateAreaChecklist({ control, stateList, fetchDistrictList }) {
  const [stateAreas, setStateAreas] = useState({});

  useEffect(() => {
    if (stateList?.length) {
      const obj = {};
      stateList.forEach(name => { obj[name] = []; });
      setStateAreas(obj);
    }
  }, [stateList]);

  const selectedStates = useWatch({ control, name: "states", defaultValue: [] });

  return (
    <div className="flex gap-4">
      {/* States panel */}
      <Controller
        name="states"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <StateChecklist
            title="Select States"
            items={stateList}
            selectedItems={field.value}
            fetchDistrictList={fetchDistrictList}
            setStateAreas={setStateAreas}
            onChange={field.onChange}
          />
        )}
      />

      {/* Districts panel */}
      <Controller
        name="areas"
        control={control}
        defaultValue={[]}
        render={({ field }) => {
          const groupedAreas = selectedStates.reduce((acc, state) => {
            acc[state] = stateAreas[state] || [];
            return acc;
          }, {});

          return (
            <DistrictChecklist
              title="Select Areas"
              groupedItems={groupedAreas}
              selectedItems={field.value}
              onChange={field.onChange}
            />
          );
        }}
      />
    </div>
  );
}
