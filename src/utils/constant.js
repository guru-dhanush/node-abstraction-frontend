export const sampleNodeDefinitions = [
  {
    type: "InputField",
    label: "Input",
    fields: [
      {
        name: "Name",
        type: "textArea",
        options: [],
        default: "input_1",
      },
      {
        name: "Type",
        type: "select",
        options: ["Text", "Number"],
        default: "Text",
      },
    ],
    handles: [
      {
        type: "source",
        position: "Right",
        name: "LLM",
      },
    ],
  },
  {
    type: "llm",
    label: "LLM",
    fields: [
      {
        name: "Name",
        type: "textArea",
        options: [],
        default: "This is a LLM.",
      },
    ],
    handles: [
      {
        type: "source",
        position: "Right",
        name: "Output",
      },
    ],
  },
  {
    type: "outputField",
    label: "Output",
    fields: [
      {
        name: "Name",
        type: "textArea",
        options: [],
        default: "output_1",
      },
      {
        name: "Type",
        type: "select",
        options: ["Text", "Number"],
        default: "Text",
      },
    ],
    handles: [
      {
        type: "source",
        position: "Right",
        name: "Text",
      },
    ],
  },
  {
    type: "TextField",
    label: "Text",
    fields: [
      {
        name: "Text",
        type: "textArea",
        options: [],
        default: "{{input}}",
      },
    ],
    handles: [
      {
        type: "source",
        position: "Right",
        name: "",
      },
    ],
  },
];
