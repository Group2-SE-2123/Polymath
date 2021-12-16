import { useState } from "react";
import { useQuery, useMutation } from "react-query";

const useProcessInterval = ({ onSuccess, onError }) => {
	const [processId, setProcessId] = useState(0);
	const [stop, setStop] = useState(false);

	// Mutation to start the process
	const { mutate } = useMutation(() => processId, {
		onMutate: () => {
			setStop(false);
		},
		onError: (error) => {
			console.error(error);
			setStop(true);
			onError();
		},
		onSuccess: () => {
			setProcessId(processId + 1);
		},
	});

	// Fetch until received status is finished
	const { isLoading, data } = useQuery(["processProgress", processId], () => processId, {
		onSuccess: (res) => {
			if (res === 10) {
				setStop(true);
				setProcessId(null);
				onSuccess();
			}
		},
		onError: (error) => {
			console.error(error);
			setStop(true);
			setProcessId(null);
			onError();
		},
		enabled: processId != null,
		refetchInterval: stop ? false : 5000,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: false,
	});

	return { mutate, data, isLoading };
};

export default useProcessInterval;
