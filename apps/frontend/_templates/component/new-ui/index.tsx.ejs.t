---
to: src/components/ui/M<%= h.changeCase.pascalCase(name.toLowerCase()) %>/index.ts
---
<% name = name.toLowerCase() %>import M<%= h.changeCase.pascalCase(name) %> from './M<%= h.changeCase.pascalCase(name) %>';

export default M<%= h.changeCase.pascalCase(name) %>;
