---
to: src/components/ui/M<%= h.changeCase.pascalCase(name.toLowerCase()) %>/M<%= h.changeCase.pascalCase(name.toLowerCase()) %>.tsx
---
<% name = name.toLowerCase() %>import React from 'react';

import M<%= h.changeCase.pascalCase(name) %>View from './M<%= h.changeCase.pascalCase(name) %>.view';

interface IProps {}

const M<%= h.changeCase.pascalCase(name) %>: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return <M<%= h.changeCase.pascalCase(name) %>View />;
};

M<%= h.changeCase.pascalCase(name) %>.displayName = 'M<%= h.changeCase.pascalCase(name) %>';
M<%= h.changeCase.pascalCase(name) %>.defaultProps = {};

export default React.memo(M<%= h.changeCase.pascalCase(name) %>);
