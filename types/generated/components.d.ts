import type { Schema, Attribute } from '@strapi/strapi';

export interface CommentItem extends Schema.Component {
  collectionName: 'components_comment_items';
  info: {
    displayName: 'item';
    icon: 'envelop';
  };
  attributes: {
    user: Attribute.String;
    message: Attribute.String;
  };
}

export interface FeatureItem extends Schema.Component {
  collectionName: 'components_feature_items';
  info: {
    displayName: 'item';
    icon: 'grid';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    icon: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'comment.item': CommentItem;
      'feature.item': FeatureItem;
    }
  }
}
