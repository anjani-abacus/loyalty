import React, { useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";

function StateChecklist({ stateAreas, setStateAreas, fetchDistrictList, title, groupedItems = {}, selectedItems = [], onChange }) {
  const handleCheck = (item, isChecked) => {

    if (isChecked) {
      fetchDistrictList({ state_name: item }, {
        onSuccess: (resp) => {

          setStateAreas(() => {
            const arr = stateAreas;
            const data = arr?.map((elem, i) => {
              const key = Object.keys(elem)[0]
              if (key?.toLowerCase() == item?.toLowerCase()) {
                arr[i][key?.toLowerCase()] = resp?.data
              }
            })
            return arr;
          })
        }
      })
    }

    let updated;
    if (selectedItems.includes(item)) {
      updated = selectedItems.filter((i) => i !== item);
    } else {
      updated = [...selectedItems, item];
    }
    onChange?.(updated);
  };

  return (
    <div className="overflow-auto w-[300px] bg-background text-foreground border-[#E8EDF7] rounded-lg p-2">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">{title}</h3>
      <div className="max-h-[300px] overflow-auto border rounded-lg">
        <Table className="table-auto w-full border-collapse min-h-[100px]">
          <TableHeader className="bg-card border-b">
            <TableRow className="bg-section-background"> 
              <TableHead className="px-3 py-2 text-left w-16">#</TableHead>
              <TableHead className="px-3 py-2 text-left">Item</TableHead>
              <TableHead className="px-3 py-2 text-center w-24">Select</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.keys(groupedItems).length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No items available
                </TableCell>
              </TableRow>
            )}

            {Object.entries(groupedItems)?.map(([group, items]) => (
              <React.Fragment key={group}>
                <TableRow className="bg-section-background">
                  <TableCell colSpan={3} className="px-3 py-1 font-semibold">
                    {group}
                  </TableCell>
                </TableRow>

                {items?.map((item, index) => (
                  <TableRow key={item} className="odd:bg-section-background even:bg-card">
                    <TableCell className="px-3 py-2 text-center">{index + 1}</TableCell>
                    <TableCell
                      className={`px-3 py-2 ${selectedItems.includes(item) ? "line-through text-muted-foreground" : ""
                        }`}
                    >
                      {item}
                    </TableCell>
                    <TableCell className="px-3 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item)}
                        onChange={(e) => handleCheck(item, e.target.checked)}
                        className="cursor-pointer"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


function DistrictChecklist({ title, groupedItems = {}, selectedItems = [], onChange }) {
  const handleCheck = (item) => {
    let updated;
    if (selectedItems.includes(item)) {
      updated = selectedItems.filter((i) => i !== item);
    } else {
      updated = [...selectedItems, item];
    }
    onChange?.(updated);
  };

  return (
    <div className="overflow-auto w-[300px] bg-background text-foreground border-[#E8EDF7] rounded-lg p-2">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">{title}</h3>
      <div className="max-h-[300px] overflow-auto border rounded-lg">
        <Table className="table-auto w-full border-collapse min-h-[100px]">
          <TableHeader className="bg-background border-b">
            <TableRow className="bg-section-background">
              <TableHead className="px-3 py-2 text-left w-16">#</TableHead>
              <TableHead className="px-3 py-2 text-left">Item</TableHead>
              <TableHead className="px-3 py-2 text-center w-24">Select</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.keys(groupedItems).length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No items available
                </TableCell>
              </TableRow>
            )}

            {Object.entries(groupedItems)?.map(([group, items]) => (
              <React.Fragment key={group}>
                <TableRow className="bg-section-background">
                  <TableCell colSpan={3} className="px-3 py-1 font-semibold">
                    {group}
                  </TableCell>
                </TableRow>

                {items?.map((item, index) => (
                  <TableRow key={item} className="odd:bg-section-background even:bg-background">
                    <TableCell className="px-3 py-2 text-center">{index + 1}</TableCell>
                    <TableCell
                      className={`px-3 py-2 ${selectedItems.includes(item) ? "line-through text-muted-foreground" : ""
                        }`}
                    >
                      {item}
                    </TableCell>
                    <TableCell className="px-3 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item)}
                        onChange={() => handleCheck(item)}
                        className="cursor-pointer"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default function StateAreaChecklist({ control, districtList, stateList, fetchDistrictList }) {



  const [stateAreas, setStateAreas] = useState({
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Delhi: ["Dwarka", "Saket", "Karol Bagh"],
    Karnataka: ["Bangalore", "Mysore"],
    Gujarat: ["Ahmedabad", "Surat"],
  });

  useEffect(() => {
    setStateAreas(() => stateList?.map(elem => ({ [elem?.toLowerCase()]: [] })))
  }, [stateList])

  // const states = Object.keys(stateAreas);

  useEffect(()=>{
    console.log('stateAreas ===> ', stateAreas)
  }, [stateAreas])

  // ✅ This watches the "states" field and triggers re-render when it changes
  const selectedStates = useWatch({ control, name: "states", defaultValue: [] });

  return (
    <div className="flex gap-6">
      {/* States */}
      <Controller
        name="states"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <StateChecklist
            title="Select States"
            groupedItems={{ States: stateList }}
            selectedItems={field.value}
            fetchDistrictList={fetchDistrictList}
            stateAreas={stateAreas}
            setStateAreas={setStateAreas}
            onChange={field.onChange}
            className="bg-red-700"
          />
        )}
      />

      {/* Areas (depends on selected states) */}
      <Controller
        name="areas"
        control={control}
        defaultValue={[]}
        render={({ field }) => {
          const groupedAreas = selectedStates.reduce((acc, state) => {
            if (stateAreas[state]) acc[state] = stateAreas[state];
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
