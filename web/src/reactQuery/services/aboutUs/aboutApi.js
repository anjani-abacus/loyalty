import client from '../../../reactQuery/axiosInstance.js';
import {
    FAQ_LIST, CREATE_FAQ,
    UPDATE_FAQ, DELETE_FAQ, FAQ_USER_TYPE,

    CONTACT_US_LIST, UPDATE_CONTACT,
    UPDATE_ABOUT_US, GET_ABOUT_US,

    BANNER_LIST, CREATE_BANNER,
    UPDATE_BANNER, BANNER_BY_ID, DELETE_BANNER,
    VIDEO_LIST,
    ADD_VIDEO,
    DELETE_VIDEO
} from '../../../reactQuery/endPoints.js';

// Raw API calls for FAQ
export const getFaqListApi = async () => {
    const { data } = await client.get(FAQ_LIST);
    return data?.data || [];
};

export const createFaqApi = async (newFaq) => {
    const { data } = await client.post(CREATE_FAQ, newFaq);
    return data;
};

export const editFaqApi = async (id, faq) => {
    const { data } = await client.put(UPDATE_FAQ(id), faq);
    return data;
};

export const deleteFaqApi = async (id) => {
    await client.delete(DELETE_FAQ(id));
};




export const fetchUserListApi = async () => {
    const res = await client.get(FAQ_USER_TYPE);
    return res.data;
};






// API contact and about us 

export const fetchContacts = async () => {
    const { data } = await client.get(CONTACT_US_LIST);
    return data?.data || [];
};

export const updateContactApi = async (id, payload) => {
    const { data } = await client.put(UPDATE_CONTACT, payload, {
      headers:{
        "Content-Type": "multipart/form-data",
      }
    });
    return data;
};

export const fetchAboutUs = async (companyId = 1) => {
    const { data } = await client.get(GET_ABOUT_US);
    const company = data?.data?.find((c) => c.id === companyId);
    return company
        ? { description: company.about_us || "", logo: company.profile_img || "" }
        : { description: "", logo: "" };
};

export const updateAboutUsApi = async (companyId, payload) => {
    const { data } = await client.put(UPDATE_ABOUT_US(companyId), payload);
    return data;
}   



// api banner

// export const createBannerApi = (data) => {
//   const formData = new FormData();
//   formData.append('banner_name', data?.banner_name);
// payload.append("user_type", data.user_type?.value || "ALL");
//   if (data.banner_image) formData.append('banner_image', data?.banner_image);

//   return client.post(CREATE_BANNER, formData, {
//     headers: { 'Content-Type': 'multipart/form-data' }
//   });
// };

// // Update Banner
// export const updateBannerApi = (id, data) => {
//   const formData = new FormData();
//   formData.append('banner_name', data.banner_name);
//   formData.append('user_type', data.user_type);
//   if (data.banner_image) formData.append('banner_image', data.banner_image);

//   return client.put(UPDATE_BANNER(id), formData, {
//     headers: { 'Content-Type': 'multipart/form-data' }
//   });
// };

// // Get Banner by ID
// export const getBannerByIdApi = (id) => client.get(BANNER_BY_ID(id));

// // Get all Banners
// export const getBannerListApi = () => client.get(BANNER_LIST);

// // Delete Banner
// export const deleteBannerApi = (id) => client.delete(DELETE_BANNER(id));

// ✅ Create Banner
export const createBannerApi = (data) => {
  const formData = new FormData();

  formData.append("banner_name", data?.banner_name || "");
  formData.append("user_type", data?.user_type?.value || "ALL");

  if (data?.banner_image instanceof File) {
    formData.append("banner_image", data.banner_image);
  }

  return client.post(CREATE_BANNER, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// ✅ Update Banner
export const updateBannerApi = (id, data) => {
  const formData = new FormData();

  formData.append("banner_name", data?.banner_name || "");
  formData.append("user_type", data?.user_type?.value || "ALL");

  if (data?.banner_image instanceof File) {
    formData.append("banner_image", data.banner_image);
  }

  return client.put(UPDATE_BANNER(id), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// ✅ Get Banner by ID
export const getBannerByIdApi = (id) => client.get(BANNER_BY_ID(id));

// ✅ Get all Banners
export const getBannerListApi = () => client.get(BANNER_LIST);

// ✅ Delete Banner
export const deleteBannerApi = (id) => client.delete(DELETE_BANNER(id));

export const fetchVideoList = async () => {
    const { data } = await client.get(VIDEO_LIST);
    return data
};

export const addVideo = async payload => {
    const {data} = await client.post(ADD_VIDEO, payload)
    return data;
  }

  export const deleteVideo = async payload => {
    const {data} = await client.delete(DELETE_VIDEO(payload), payload)
    return data;
  }