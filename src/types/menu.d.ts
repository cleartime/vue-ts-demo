export interface Menu extends BaeMenu {
    children?: BaeMenu[] | null;
}
// 基本菜单属性
interface BaeMenu {
    title: string;
    type: string;
    path: string;
    name: string;
    key: string;
    id: number;
    parentId: number;
    isParentMenu: boolean;
    canChangeCorp?: boolean | undefined;
    icon: string | null;
}
