import { DataTable } from "../../../../layouts/DataTable";
import Container from "../../../../components/ui/container";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ConfirmationBox, ConfirmationDialog } from "../../../../components/confirmationDialog";
import { HashLoader } from "react-spinners";
import { LoaderIcon } from "lucide-react";
import { FilterDialog } from "../../../../components/filterDialog";
import { getLedgerColumns } from "../Columns";

import { useInfluencers, useLedgerList, useUpdateInfluencer, useUpdateLoginStatus, useUpdateTypeChange } from "../useData";
import TableSkeleton from "../../../../skeleton/tableSkeleton";

// import {  useQueryClient } from "@tanstack/react-query";

const Ledger = ({influencerId}) => {
    const { influencerCategory } = useParams();
    const [selectedType, setSelectedType] = useState("");

    const [tabValue, setTabValue] = useState("PENDING");
    const isFirstRender = useRef(true)
    const [filter, setFilter] = useState({})
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const { fetchInfluencerData, influencerData, total, tabListData, isPending } = useInfluencers();

    const { ledgerList, isLoading, refetch, isFetching } = useLedgerList(influencerId);
    console.log('asdfasdf=> ', ledgerList)
    const [start, setStart] = useState(0)
    const [alertValue, setAlertValue] = useState(null)
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [showStatusConfirm, setShowStatusConfirm] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const { mutate: updateInfluencer } = useUpdateInfluencer()
    const { mutate: updateLoginStatus } = useUpdateLoginStatus()
    const { mutate: updateTypeChange } = useUpdateTypeChange()

    useEffect(() => {
        if (!isFirstRender.current) {
            fetchInfluencerData({
                page,
                limit,
                filters: {
                    ...filter,
                    status_of_profile: tabValue,
                    // influencer_type_name: influencerCategory?.charAt(0).toUpperCase() + influencerCategory?.slice(1) 
                    influencer_type_name: influencerCategory?.toUpperCase() || ""

                },
            });
        }
        isFirstRender.current = false;
    }, [tabValue, filter, page, influencerCategory]);

    const onRefresh = () => {
        setFilter({
            ...filter,
            status_of_profile: tabValue,
            influencer_type_name: influencerCategory?.toUpperCase() || "",
        });
        setPage(1);
    };

    const handleStatusChange = (row) => {
        setSelectedRow(row);
        setShowStatusConfirm(true);
    };


    const confirmStatusChange = () => {
        const newStatus = !selectedRow.active_status;

        updateLoginStatus(
            {
                id: selectedRow.id,
                payload: { active_status: newStatus },
            },
            {
                onSuccess: () => {
                    setShowStatusConfirm(false);
                    fetchInfluencerData({
                        page,
                        limit,
                        filters: {
                            ...filter,
                            status_of_profile: tabValue,
                            influencer_type_name: influencerCategory?.toUpperCase() || "",
                        },
                    });
                },
                onError: () => {
                    setShowStatusConfirm(false);
                },


            }
        );
    };



    const handleTypeChange = (value, row) => {
        setSelectedType(value);
        setAlertValue({ value, id: row?.id }); // ✅ store id instead of mobile
        setShowAlertDialog(true);
    };

    const handleResult = (action) => {
        if (action === "continue" && alertValue) {
            updateTypeChange({
                id: alertValue.id,
                payload: { influencer_type_name: alertValue.value },
            }, {
                onSuccess: () => {
                    setShowAlertDialog(false);

                    fetchInfluencerData({
                        page,
                        limit,
                        filters: {
                            ...filter,
                            status_of_profile: tabValue,
                            influencer_type_name: influencerCategory?.toUpperCase() || "",
                        },
                    });
                },
                onError: () => setShowAlertDialog(false),
            })

        } else {
            setShowAlertDialog(false);
        }
    };


    const alertSubmitHandler = () => { }

    return (
        <>
                <DataTable
                    isLoading={isPending}
                    disableHeader={true}
                    pageTitle={influencerCategory}
                    userData={ledgerList || []}
                    setFilter={setFilter}
                    renderSkeleton={() => <TableSkeleton columns={getLedgerColumns({})} rows={limit} />}
                    columns={getLedgerColumns({ selectedType, setSelectedType, handleTypeChange, handleStatusChange, limit, page })}
                    alertSubmitHandler={alertSubmitHandler}
                    setTabValue={setTabValue}
                    startPoint={start}
                    setStartPoint={setStart}

                    onRefresh={onRefresh}
                    alertValue={alertValue}

                    page={page}
                    limit={limit}
                    setPage={setPage}
                    setLimit={setLimit}
                    total={tabListData?.filter((item) => (item?.key == tabValue))[0]?.count}
                />
                <FilterDialog />

                <ConfirmationDialog
                    openDialog={showAlertDialog}
                    setOpenDialog={setShowAlertDialog}
                    onResult={handleResult}
                />

                <ConfirmationBox
                    openDialog={showStatusConfirm}
                    setOpenDialog={setShowStatusConfirm}
                    title="Change Login Status"
                    message={`Are you sure you want to ${selectedRow?.active_status ? "deactivate" : "activate"
                        } this influencer?`}
                    onResult={confirmStatusChange}
                    onCancel={() => setShowStatusConfirm(false)}
                />
        </>
    );
};

export default Ledger;
