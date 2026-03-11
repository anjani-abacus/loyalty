import React, { useEffect, useState } from "react";
import { useVideoList, useDeleteVideo, useCreateVideo } from "./useData";
import { DetailHeader } from "../../../layouts/DataTable/Header";
import { Video, Plus, Trash2 } from "lucide-react";
import Container from "../../../components/ui/container";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { ConfirmationBox } from "../../../components/confirmationDialog";
import { BannerSkeleton } from "../../../skeleton/tableSkeleton";
import { RefreshCcw } from "lucide-react";

const extractYoutubeId = (url) => {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const VideoList = () => {
  // const { fetchVideos, videoData, isLoading, isError, error, page, limit } = useVideoList();
  const { videoList, refetch: fetchVideoList, isLoading, isFetching, isError } = useVideoList();
  const { mutate: deleteVideo, isLoading: isDeleting, isError: deleteError, error: deleteErrorMsg } = useDeleteVideo();
  const { mutate: createVideo, isLoading: isCreating } = useCreateVideo();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  const refreshHandler = () => {
    fetchVideoList()
  }



  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleDialogResult = (action) => {
    if (action === "continue" && selectedId) {
      deleteVideo(selectedId, {
        onSuccess: () => {
          setOpenDialog(false);
          setSelectedId(null);
          fetchVideoList()
        },
      });
    } else {
      setOpenDialog(false);
      setSelectedId(null);
    }
  };

  const handleAdd = () => {
    navigate("/add-video");
  };

  // if (isLoading) {
  //   return (
  //     <Container>
  //       <DetailHeader pageTitle="Video List" />
  //       <div className="flex justify-end mr-10 items-center">
  //         <Button disabled>
  //           <Plus className="w-4 h-4 mr-1" /> Add Video
  //         </Button>
  //       </div>
  //       <BannerSkeleton />
  //     </Container>
  //   );
  // }

  return (
    <Container>
      <DetailHeader pageTitle="Video List" />
      <div className="  text-foreground">

        <div className="flex  m-2 rounded-xl p-2 gap-3 justify-end items-center">
          <button
            onClick={(!isLoading || !isFetching) ? refreshHandler : undefined}
            disabled={(isLoading || isFetching)}
            className={`p-2 rounded-md transition ${(isLoading || isFetching) ? "opacity-50 cursor-not-allowed" : "hover:bg-card"
              }`}
          >
            <RefreshCcw
              size={20}
              className={`${(isLoading || isFetching) ? "animate-[spin_1s_linear_infinite]" : ""}`}
            />
          </button>
          <Button onClick={handleAdd}
            className="ml-4 text-sm p-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Video
          </Button>
        </div>

        <div className="flex flex-wrap p-2 gap-4 mt-1 justify-center">
          {videoList?.map((video) => {
            const videoId = extractYoutubeId(video?.video_url)
            return (
              <div
                key={video.id}
                className="flex flex-col shadow rounded-xl p-3 w-[300px] border hover:shadow-md transition bg-section-background"
              >
                <div className="w-full h-[160px] bg-muted rounded-md overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={video?.video_title}
                    className="w-full h-full border-none"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="mt-2">
                  <div className="flex">
                    <h3 className="flex-1 text-sm font-semibold line-clamp-2">{video?.video_title}</h3>
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteClick(video.id)}
                        disabled={isDeleting}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {video?.user_type}
                  </p>
                  <p className="text-xs mt-4 text-muted-foreground">
                    {video?.video_desc}
                  </p>
                </div>
              </div>
            )
          }
          )}
        </div>
      </div>
      {deleteError && (
        <p className="text-red-500 mt-2">Error deleting video: {deleteErrorMsg?.message}</p>
      )}

      <ConfirmationBox
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title="Delete Video"
        message="Are you sure? This action cannot be undone."
        onResult={handleDialogResult}
      />
    </Container>
  );
};

export default VideoList;

