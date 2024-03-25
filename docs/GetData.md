# `GetData` Documentation

This document provides a overview of the `GetData` activity, which is designed for retrieving structured data based on specific queries. The software relies on the [wild-wild-path](https://github.com/ehmicky/wild-wild-path) package.

## Overview

`GetData` allows you to extract information from complex data structures (e.g., JavaScript objects or arrays) by specifying a path, mode, and optional settings. It supports various operations such as fetching a single value, listing all matching properties, iterating through items, and more.

## Parameters

- **Target**: The JavaScript object/array to query. Typically, this is the output produced by other activities within your workflow.
- **Path**: A string or array specifying the data's location. Supports dot notation for deep properties, wildcards for matching multiple elements, slices for subarrays, and regex for flexible searching.
- **Mode**: Defines the operation type (`get`, `list`, `iterate`, etc.) to be performed on the target data.
- **Options** *(optional)*: Additional settings to customize the query behavior, such as sorting, filtering missing properties, and controlling recursion.
- **Default** *(optional)*: A fallback value returned if the specified path does not exist in the target.

### Target

TODO: explain

```js
/* $example.result */
{
  features: [
    {id: 1, name: "Feature 1", type: "Point", coordinates: [102.0, 0.5]},
    {id: 2, name: "Feature 2", type: "LineString", meta: {author: "ChatGPT"}, coordinates: [[102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]]},
    {id: 3, name: "Feature 3", type: "Polygon", coordinates: [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]]]},
    {id: 4, type: "Deleted"}
  ]
}
```

### Mode Operations

#### `get`
Fetches the first matching property.
- **Example**: Retrieve the name of the first feature.
  - Path: `'features.0.name'`
  - Output: `'Feature 1'`

#### `list`
Compiles all matching properties into an array.
- **Example**: List all feature IDs.
  - Query: `features.*.id`
  - Output: `[1, 2, 3, 4]`

#### `iterate`
Iterates over each matching element.
- **Example**: Loop through each feature.
  - Path: `'features.*'`
  - Usage: Suitable for looping activities in your code.

#### `entries`
Returns key-value pairs for all matching properties.
- **Example**: Get coordinates of the features.
  - Path: `'features.0:2.coordinates'`
  - Output: `[{value: Array(2), path: Array(3), missing: false}, {value: Array(4), path: Array(3), missing: false}]`

#### `pick`
Selects specific properties from an object.
- **Example**: Extract the ID and name of features.
  - Target: `=$example.result.features`
  - Path: `*./id\|name/`
  - Output: `[{"id": 1, "name": "Feature 1"}, {"id": 2, "name": "Feature 2"}, {"id": 3, "name": "Feature 3"}, {"id": 4}]`


#### `flatten`
Flattens the object to a single depth.
- **Example**: Flatten features properties.
  - Path: `'.'`
  - Output:
  ```javascript
  {
      "features.0.id": 1,
      "features.0.name": "Feature 1",
      "features.0.type": "Point",
      "features.0.coordinates.0": 102,
      "features.0.coordinates.1": 0.5,
      "features.1.id": 2,
      "features.1.name": "Feature 2",
      "features.1.type": "LineString",
      "features.1.meta.author": "ChatGPT",
      ...
      "features.2.name": "Feature 3",
      "features.2.type": "Polygon",
      ...
      "features.3.id": 4,
      "features.3.type": "Deleted"
  }
  ```

## Advanced Options

`GetData` supports numerous options for fine-tuning query execution, including but not limited to:

- **childFirst**: Controls traversal order.
- **roots**: Matches only root properties.
- **leaves**: Matches only leaf properties.
- **sort**: Sorts sibling properties lexicographically.
- **missing**: Ignores undefined properties.
- **entries**: Returns detailed objects for each matched property.
- **shallowArrays**: Limits wildcard recursion in arrays.
- **classes**: Treats class instances differently from plain objects.
- **inherited**: Includes inherited properties.
- **mutate**: Mutates the target object directly.

This API is designed to provide maximum flexibility for data retrieval, supporting complex querying needs within your applications.
