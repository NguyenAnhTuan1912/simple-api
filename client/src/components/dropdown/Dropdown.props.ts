export type DropdownProps<N> = {
  title: string;
  items: Array<N>;
  onSelectItem: (item: N) => void;
  renderItem: (item: N) => JSX.Element;
}