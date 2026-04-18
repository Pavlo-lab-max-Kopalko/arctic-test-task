import { Dispatch, SetStateAction } from "react";
import { API_URL } from "../config";
import fetchSnippets from "./fetchSnippets";
import { ISnippet } from "../types/snippet";

type data = {
  title: string,
  content: string,
  type: string,
  tags: string[],
}

type Params = {
  snippetData: data,
  setTitle: (value: SetStateAction<string>) => void,
  setCode: (value: SetStateAction<string>) => void,
  searchQuery?: string | undefined,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setSnippets: Dispatch<SetStateAction<ISnippet[]>>,
  setError: Dispatch<SetStateAction<string | null>>,
  setTags: Dispatch<SetStateAction<string>>,
}

const createSnippet = async ({
  snippetData,
  setTitle,
  setCode,
  searchQuery,
  setLoading,
  setSnippets,
  setError,
  setTags,
}: Params) => {
  try {
    const res = await fetch(`${API_URL}/snippets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(snippetData),
    });

    if (res.ok) {
      setTitle('');
      setCode('');
      setTags('');
      fetchSnippets({ searchQuery, setLoading, setSnippets, setError });
    }

  } catch {
    setError("Бекенд не відповідає або сталася помилка при збереженні.");
  }
};

export default createSnippet;
