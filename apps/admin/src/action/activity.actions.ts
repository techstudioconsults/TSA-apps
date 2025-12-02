const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/activities`;
export interface Activity {
  id: string;
  activity: string;
  description: string;
  createdAt: string;
}

export const getAllActivityAction = async (
  token: string,
  page: number = 1,
  limit: number = 10,
): Promise<{ data: Activity[]; totalPages: number }> => {
  try {
    const response = await fetch(`${BASE_URL}?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch activities: ${response.statusText}`);
    }

    const data = await response.json();
    // console.log(data);
    return {
      data: data.data.items,
      totalPages: data.data.metadata.totalPages,
    };
  } catch (error) {
    console.error("Error in getAllActivityAction:", error);
    throw error;
  }
};
