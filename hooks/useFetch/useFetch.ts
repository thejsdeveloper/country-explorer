import { getDataFromStore, setDataToStore } from "@/utils/asyncStorage";
import * as React from "react";

type Action<T> =
  | {
      type: "loading";
    }
  | {
      type: "fetched";
      payload: T;
    }
  | {
      type: "error";
      payload: Error;
    };

type State<T> = {
  data?: T;
  error?: Error;
};

type FetchReducer<T> = (state: State<T>, action: Action<T>) => State<T>;

const initialState = {
  error: undefined,
  data: undefined,
};

const reducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case "loading":
      return { ...initialState };
    case "fetched":
      return { ...initialState, data: action.payload };
    case "error":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default function useFetch<T = unknown>(
  url: string,
  options?: RequestInit
) {
  const [state, dispatch] = React.useReducer<FetchReducer<T>>(
    reducer,
    initialState
  );

  React.useEffect(() => {
    if (!url) return;

    let cancelRequest = false;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      try {
        const cachedResponse = await getDataFromStore<T>(url);

        if (cachedResponse) {
          dispatch({ type: "fetched", payload: cachedResponse });
          return;
        }
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const json = (await response.json()) as T;
        await setDataToStore<T>(url, json);

        if (cancelRequest === false) {
          dispatch({ type: "fetched", payload: json });
        }
      } catch (e) {
        if (cancelRequest === false) {
          dispatch({ type: "error", payload: e as Error });
        }
      }
    };

    fetchData();

    return () => {
      cancelRequest = true;
    };
  }, [url]);

  return state;
}
