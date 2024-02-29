The `Options` type is an interface that provides various configuration options for the data retrieval operations. Here is a detailed description of each property in the `Options` type:

- `childFirst`: This is a boolean property. When using unions or deep wildcards, a query might match both a property and some of its children. This option decides whether the returned properties should be sorted from children to parents, or the reverse. The default value is `false`.

- `roots`: This is a boolean property. When using unions or deep wildcards, a query might match both a property and some of its children. When `true`, only roots are matched. In other words, a matching property is ignored if one of its parents also matches. The default value is `false`.

- `leaves`: This is a boolean property. When using unions or deep wildcards, a query might match both a property and some of its children. When `true`, only leaves are matched. In other words, a matching property is ignored if one of its children also matches. The default value is `false`.

- `sort`: This is a boolean property. When returning sibling object properties, sort them by the lexicographic order of their names (not values). The default value is `false`.

- `missing`: This is a boolean property. When `false`, properties not defined in the target are ignored. The default value is `false` with `list|iterate()`, `true` with `set()`.

- `entries`: This is a boolean property. By default, properties' values are returned. When `true`, objects with the following shape are returned instead: `value` `any`: property's value, `path` `Path`: property's full path, `missing` `boolean`: whether the property is missing from the target. The default value is `false`.

- `shallowArrays`: This is a boolean property. If `true`, wildcards do not recurse on arrays. Array items can still be matched by using indices or slices. The default value is `false`.

- `classes`: This is a boolean property. Unless `true`, wildcards and regexps ignore properties of objects that are not plain objects (like class instances, errors or functions). Those can still be matched by using their property name. The default value is `false`.

- `inherited`: This is a boolean property. By default, wildcards and regexps ignore properties that are either inherited or not enumerable. Those can still be matched by using their property name. When `true`, inherited properties are not ignored, but not enumerable ones still are. The default value is `false`.

- `mutate`: This is a boolean property. By default, the target is deeply cloned. When `true`, it is directly mutated instead, which is faster but has side effects. The default value is `false`.

Please note that the `Options` type also includes a `readonly` modifier for all properties, which means that once a value is assigned to a property, it cannot be changed.
