type reaction = {
  target: {
    name: string,
    icon_path: string
  },
  comment: string,
  created_at: string
};

export type reactions = {
  receive: reaction[],
  send: reaction[]
};
