import { MenuItem } from './menu-item';

export enum LinkMenuItemType {
  Dashboard = 'dashboard',
  Search = 'search',
  Site = 'site',
  Conversations = 'conversations'
}

export const linkMenuItemTypes = [
  { type: LinkMenuItemType.Dashboard, title: 'Dashboard', link: () => ['/app', window['project']], icon: 'dashboard' },
  { type: LinkMenuItemType.Search, title: 'Search', link: () => ['/app', window['project'], 'search'], icon: 'search' },
  { type: LinkMenuItemType.Site, title: 'Open site', link: undefined, externalLink: () => 'http://jetadmin.io/', icon: 'earth_planet' },
  { type: LinkMenuItemType.Conversations, title: 'Conversations', link: () => ['/app', window['project'], 'conversations'], icon: 'chat' }
];

export class LinkMenuItem extends MenuItem {

  public icon: string;
  public title: string;
  public linkType;
  public customLink: string;

  deserialize(data: Object): LinkMenuItem {
    super.deserialize(data);
    this.icon = this.params['icon'];
    this.title = this.params['title'];
    this.linkType = linkMenuItemTypes.find(item => item.type == this.params['link_type']);
    this.customLink = this.params['custom_link'];
    return this;
  }

  serialize(): Object {
    const data = super.serialize();
    data['params']['icon'] = this.icon;
    data['params']['title'] = this.title;
    data['params']['link_type'] = this.linkType ? this.linkType.type : undefined;
    data['params']['custom_link'] = this.customLink;
    return data;
  }

  get displayLink() { // TODO: refactor links
    if (this.customLink) {
      return;
    }

    if (!this.linkType) {
      return [''];
    }

    if (this.linkType.link && this.linkType.link()) {
      return this.linkType.link();
    }
  }

  get externalLink() {
    if (this.customLink) {
      return this.customLink;
    }

    if (!this.linkType) {
      return;
    }

    if (this.linkType.externalLink && this.linkType.externalLink()) {
      return this.linkType.externalLink();
    }

    // return this.linkType.link();
  }

  get displayTitle() {
    if (this.title) {
      return this.title;
    }

    if (!this.linkType) {
      return;
    }

    return this.linkType.title;
  }

  get displayIcon() {
    if (this.icon) {
      return this.icon;
    }

    if (!this.linkType) {
      return;
    }

    return this.linkType.icon;
  }
}
