import { useState ,useEffect } from "react";
import { addVideo, deleteVideo, fetchVideoList } from "../../../reactQuery/services/aboutUs/aboutApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";




export const useVideoList = () => {
  const { isLoading, refetch, data, isFetching, isError } = useQuery({
    queryKey: ['videoList'], // include id
    queryFn: () => fetchVideoList(),
  });
return { videoList:data?.data, isLoading, refetch, isFetching, isError }
};


export const useDeleteVideo = () => {
  return useMutation({
    mutationFn: (payload) => deleteVideo(payload)
  })
};


// export const useCreateVideo = () =>
//   useMutation({
//     mutationFn: (payload) => addVideo(payload),
//   });
 



export const useCreateVideo = () => {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => addVideo(payload),
    onSuccess: () => {
      // return invalidate promise so UI remains loading while cache refresh happens
      return qc.invalidateQueries({ queryKey: ["videos"] });
    },
  });

  return {
    createVideo: mutation.mutateAsync,
    isLoading: mutation.isLoading ?? mutation.isPending ?? false,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
};

export const useUpdateVideo = () => {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, payload }) => updateVideoApi(id, payload),
    onSuccess: () => {
      return qc.invalidateQueries({ queryKey: ["videos"] });
    },
  });

  return {
    updateVideo: mutation.mutateAsync,
    isLoading: mutation.isLoading ?? mutation.isPending ?? false,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
};


export const useGetVideoById = (id) => {
  const [video, setVideo] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (id) {
      setIsFetching(true);
      setTimeout(() => {
        const found = mockVideos.find((v) => v.id === Number(id));
        setVideo(found || null);
        setIsFetching(false);
      }, 400);
    }
  }, [id]);

  return { video, isFetching };
};

// export const useCreateVideo = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const createVideo = (payload, { onSuccess }) => {
//     setIsLoading(true);
//     setTimeout(() => {
//       mockVideos.push({ id: mockVideos.length + 1, ...payload });
//       setIsLoading(false);
//       onSuccess?.();
//     }, 600);
//   };
//   return { createVideo, isLoading };
// };

// export const useUpdateVideo = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const updateVideo = (id, payload, { onSuccess }) => {
//     setIsLoading(true);
//     setTimeout(() => {
//       mockVideos = mockVideos.map((v) =>
//         v.id === Number(id) ? { ...v, ...payload } : v
//       );
//       setIsLoading(false);
//       onSuccess?.();
//     }, 600);
//   };
//   return { updateVideo, isLoading };
// };