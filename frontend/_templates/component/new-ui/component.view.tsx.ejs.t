---
to: src/components/ui/M<%= h.changeCase.pascalCase(name.toLowerCase()) %>/M<%= h.changeCase.pascalCase(name.toLowerCase()) %>.view.tsx
---
<% name = name.toLowerCase() %>import React from 'react';

import classes from './M<%= h.changeCase.pascalCase(name) %>.module.scss';

interface IProps {}

const M<%= h.changeCase.pascalCase(name) %>View: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return <></>;
};

M<%= h.changeCase.pascalCase(name) %>View.displayName = 'M<%= h.changeCase.pascalCase(name) %>View';
M<%= h.changeCase.pascalCase(name) %>View.defaultProps = {};

export default React.memo(M<%= h.changeCase.pascalCase(name) %>View);
