import { DocsAPI } from "./docs";

const __ROOT__ = import.meta.env.SIMPLE_API_ROOT;

const __SimpleBases = {
  Docs: __ROOT__ + "/docs"
}

export const Docs_API = new DocsAPI(__SimpleBases.Docs);