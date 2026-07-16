import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios/axios-instance";

export interface FaceDetectionResult {
  id: string;
  matched_person_id: string | null;
  confidence: number;
  bbox: { x: number; y: number; width: number; height: number } | null;
  status: "resident" | "staff" | "visitor" | "blacklist" | "unknown";
  image_url: string | null;
  full_frame_url: string | null;
  matched_person: { name: string | null; flat_no: string | null; role: string } | null;
  camera_name: string | null;
  detected_at: string;
}

export interface FaceDetectionStats {
  total: number;
  residents: number;
  staff: number;
  visitors: number;
  unknown: number;
  blacklist: number;
}

interface FaceDetectionState {
  liveResult: FaceDetectionResult | null;
  detections: FaceDetectionResult[];
  stats: FaceDetectionStats | null;
  total: number;
  isDetecting: boolean;
  isLoadingList: boolean;
  isEnrolling: boolean;
  error: string | null;
}

const initialState: FaceDetectionState = {
  liveResult: null,
  detections: [],
  stats: null,
  total: 0,
  isDetecting: false,
  isLoadingList: false,
  isEnrolling: false,
  error: null,
};

export const detectFace = createAsyncThunk<
  FaceDetectionResult,
  { image: Blob; cameraId: string },
  { rejectValue: string }
>("faceDetection/detect", async ({ image, cameraId }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("file", image, "frame.jpg");
    const response = await axiosInstance.post(
      `/face_detection/detect?camera_id=${cameraId}`,
      formData,
      { headers: { "Content-Type": undefined } }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.detail || "Detection failed");
  }
});

export const listFaceDetections = createAsyncThunk<
  { items: FaceDetectionResult[]; total: number; stats: FaceDetectionStats },
  | { cameraId?: string; status?: string; search?: string; offset?: number; limit?: number }
  | undefined,
  { rejectValue: string }
>("faceDetection/list", async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/face_detection/detections", {
      params: {
        camera_id: params?.cameraId,
        status: params?.status,
        search: params?.search,
        offset: params?.offset ?? 0,
        limit: params?.limit ?? 20,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.detail || "Failed to load detections");
  }
});

export const enrollFace = createAsyncThunk<
  { id: string; name: string; role: string },
  { image: Blob; name: string; role: string; flatNo?: string; phone?: string },
  { rejectValue: string }
>("faceDetection/enroll", async ({ image, name, role, flatNo, phone }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("file", image, "enroll.jpg");
    formData.append("name", name);
    formData.append("role", role);
    if (flatNo) formData.append("flat_no", flatNo);
    if (phone) formData.append("phone", phone);
    const response = await axiosInstance.post("/face_detection/enroll", formData, {
      headers: { "Content-Type": undefined },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.detail || "Enrollment failed");
  }
});

export const applyFaceAction = createAsyncThunk<
  { detectionId: string; action: string },
  { detectionId: string; action: string },
  { rejectValue: string }
>("faceDetection/applyAction", async ({ detectionId, action }, { rejectWithValue }) => {
  try {
    await axiosInstance.post(`/face_detection/detections/${detectionId}/action`, { action });
    return { detectionId, action };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.detail || "Action failed");
  }
});

const faceDetectionSlice = createSlice({
  name: "faceDetection",
  initialState,
  reducers: {
    clearLiveResult: (state) => {
      state.liveResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(detectFace.pending, (state) => {
        state.isDetecting = true;
      })
      .addCase(detectFace.fulfilled, (state, action) => {
        state.isDetecting = false;
        state.liveResult = action.payload;
        state.error = null;
      })
      .addCase(detectFace.rejected, (state, action) => {
        state.isDetecting = false;
        state.liveResult = null;
        state.error = action.payload as string;
      });

    builder
      .addCase(listFaceDetections.pending, (state) => {
        state.isLoadingList = true;
      })
      .addCase(listFaceDetections.fulfilled, (state, action) => {
        state.isLoadingList = false;
        state.detections = action.payload.items;
        state.total = action.payload.total;
        state.stats = action.payload.stats;
      })
      .addCase(listFaceDetections.rejected, (state, action) => {
        state.isLoadingList = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(enrollFace.pending, (state) => {
        state.isEnrolling = true;
      })
      .addCase(enrollFace.fulfilled, (state) => {
        state.isEnrolling = false;
      })
      .addCase(enrollFace.rejected, (state, action) => {
        state.isEnrolling = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearLiveResult } = faceDetectionSlice.actions;
export default faceDetectionSlice.reducer;
