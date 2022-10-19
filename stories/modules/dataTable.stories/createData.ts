import { Column, DefaultData } from "@eGroupAI/material-module/DataTable";

export interface RowData extends DefaultData {
  [key: string]: any;
}

export default function createData(columnNumber: number, rowNumber: number) {
  const columns: Column<RowData & DefaultData>[] = [];
  for (let i = 0; i < columnNumber; i++) {
    columns.push({
      name: `Column ${i}`,
      id: `Column ${i}`,
      dataKey: `Column ${i}`,
    });
  }
  let data: RowData[] = [];
  for (let i = 0; i < rowNumber; i++) {
    data.push({});
    for (let j = 0; j < columns.length; j++) {
      const column = columns[j];
      data[i] = {
        ...data[i],
        [column.id]: `text ${j}-${i}`,
      };
    }
  }
  data = data.map((el, index) => ({
    ...el,
    id: index,
  }));
  return { columns, data };
}
