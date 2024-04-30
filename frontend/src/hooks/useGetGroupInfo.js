import { useState, useEffect } from "react";

const useGetGroupInfo = (id) => {
    const [loading, setLoading] = useState(true);
    const [groupInfo, setGroupInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/info/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setGroupInfo(data);
                } else {
                    setError(data.error);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return { loading, groupInfo, error };
};

export default useGetGroupInfo;
