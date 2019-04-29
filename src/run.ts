import findIcon from "./icons";

const itemKey = ".js-navigation-item";
const fileWrapKey = ".file-wrap";
const iconKey = "icon";
const contentKey = "content";
const ariaLabelKey = "aria-label";

export class ItemIcon {
  public type: string;
  public value: string;
  public icon?: string;
  public replace: boolean;
  constructor(type: string, value: string){
    this.type = type;
    this.value = value;
    this.replace = true;
    const icon = findIcon(this.type, this.value);
    if (icon) {
      this.icon = chrome.runtime.getURL(`./icons/${icon}`);
    } else {
      this.replace = false;
    }
  }
}

const replaceIcon = (item: ItemIcon, iconEle: Element) => {
  if (item.replace) {
    iconEle.innerHTML = `<img src=${item.icon} class="icon-img" />`;
  }
}

const executeGithub = (): ItemIcon[] => {
  const itemsParseResult: ItemIcon[] = [];
  const items = document.querySelectorAll(`${fileWrapKey} ${itemKey}`);
  if (items.length > 0) {
    items.forEach((item) => {
      const tds = item.children
      const tdIcon = tds[0];
      const tdContent = tds[1];
      if (tdIcon.classList.value === iconKey && tdContent.classList.value === contentKey) {
        const svgs = tdIcon.children;
        const svg = svgs[0];
        const type = svg.getAttribute(ariaLabelKey);
        const value = tdContent.querySelector('a')!.text;
        const itemIcon = new ItemIcon(type || "", value);
        itemsParseResult.push(itemIcon);
        replaceIcon(itemIcon, tdIcon);
      }
    });
  }
  return itemsParseResult;
}

const run = () => {
  executeGithub();
}

export default run;
