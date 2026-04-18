import { Dispatch, SetStateAction } from "react";
import { API_URL } from "../config";
import { ISnippet } from "../types/snippet";
import fetchSnippets from "./fetchSnippets";

type Params = {
  _id: string,
  searchQuery?: string | undefined,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setSnippets: Dispatch<SetStateAction<ISnippet[]>>,
  setError: Dispatch<SetStateAction<string | null>>,
}

const deleteData = async ({
  _id,
  searchQuery,
  setLoading,
  setSnippets,
  setError,
}: Params) => {
  try {
    const res = await fetch(`${API_URL}/snippets/${_id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      fetchSnippets({ searchQuery, setLoading, setSnippets, setError });
    }
  } catch {
    setError("Сервер не відповідає, видалити не вдалося.");
  }
}

export default deleteData;
