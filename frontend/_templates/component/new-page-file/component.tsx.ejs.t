---
to: src/pages/<%= h.changeCase.pascalCase(name.toLowerCase()) %>.tsx
---
<% name = name.toLowerCase() %>import React from 'react';

import <%= h.changeCase.pascalCase(name) %> from '../components/containers/<%= h.changeCase.pascalCase(name) %>.tsx';

interface IProps {}

const <%= h.changeCase.pascalCase(name) %>Page: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {

  return <<%= h.changeCase.pascalCase(name) %>/>;
};

<%= h.changeCase.pascalCase(name) %>Page.displayName = '<%= h.changeCase.pascalCase(name) %>Page';
<%= h.changeCase.pascalCase(name) %>Page.defaultProps = {};

export default <%= h.changeCase.pascalCase(name) %>Page;
