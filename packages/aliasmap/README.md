# AliasMap
AliasMap class from lost types series. Bi-directional map with support of aliases. Might be a good solution for indexing unique data and aimed for bidirectional constant time retrieval of map entries.

## Usage

In the terminal:
```

% npm install @lost-types/alias-map

```

Then in the module:
```js

// JavaScript modules
import AliasMap from '@lost-types/alias-map';

// CommonJS
const AliasMap = require('@lost-types/alias-map');

const aliasMap = new AliasMap();

```

## Motivation

The idea was originated while working on Color type of the same series. I needed to map color names to their hexadecimal values and Map() sounded like a correct choice for the job. However, later I also needed to map hexadecimal values back to the names, and in addition to linear O(n) complexity of this task, colors also have aliases, for example both “grey” and “gray” result in one value which make the opposite task “stateful”, because you will have to determine which one is a primary key and which one is alias. All these resulted in AliasMap class with constant time bi-directional retrieval in the following way:

**`AliasMap.get(KEY) -> VALUE`**

**`AliasMap.get(ALIAS) -> VALUE`**

**`AliasMap.get(VALUE) -> KEY`**

```js

const aliasMap = new AliasMap();
aliasMap.set('gray', '#808080', 'grey');

aliasMap.get('gray'); // #808080
aliasMap.get('grey'); // #808080
aliasMap.get('#808080'); // "gray"

```

## API

### Constructor

```text

new AliasMap([aliasMapDescriptor])

```

AliasMap constructor expects optional descriptor object with following optional keys:

| **Key**       | **Type** | **Default value** |
|---------------|----------|-------------------|
| `strict`      | `boolean`| `true`            |
| `immutable`   | `boolean`| `true`            |

- **strict**
Indicates whether AliasMap instance will throw an error in the attempt to rewrite immutable data, such as primary key, value or alias. Defaults to true. If set to false, setter function will return `false` instead of Error and no mutation will occure unless `immutable` flag is set to true.

```js

const aliasMap = new AliasMap({ strict: false });

aliasMap.set('A', 'B', 'C');

aliasMap.set('D', 'E', 'B'); // false

aliasMap.has('D'); // false
aliasMap.entryCount; // 1

```

- **immutable**
Indicates whether data in AliasMap can be rewrited. NOTE: Due to the coupled nature of keys, values and aliases, whole entries will be destroyed on the rewrite of primary key or value. Rewriting of alias will not destroy entry and will only delete this alias from the entry. Defaults to true.

```js

const aliasMap = new AliasMap({ immutable: false });

aliasMap.set('A', 'B', 'C');

// Will destroy current entry as "B" is used as value
aliasMap.set('D', 'E', 'B');

aliasMap.has('D'); // true
aliasMap.has('A'); // false
aliasMap.entryCount; // 1

// Will delete alias "B" associated with "D", without destroyng "D" entry
aliasMap.set('A', 'B', 'C');

aliasMap.entryCount; // 2
aliasMap.hasAlias('D', 'B'); // false
aliasMap.getAliases('D'); // []

```

### Properties

#### `AliasMap.size`
#### `AliasMap.entriesCount`

Returns total Map size and number of connected entries made, where one entry is a primary key, value and all the aliases associated with the key.

```js

const aliasMap = new AliasMap();

const user = { userData: 'Might be stored here' };
aliasMap.set('primary.email@example.com', user, 'secondary.email@example.com');

aliasMap.size; // 3
aliasMap.entriesCount; // 1

```

### Methods

#### `AliasMap.prototype.getOwnDescriptor()`

Returns descriptor object of alias map.

```js

const aliasMap = new AliasMap({ strict: false });
aliasMap.getOwnDescriptor(); // {strict: false, immutable: true}

```

***

#### `AliasMap.prototype.get()`

Returns value if primary key or any of aliases provided and primary key if value provided.

| **Parameter** | **Type** | **Default value** | **Notes**                      |
|---------------|----------|-------------------|--------------------------------|
| `item`        | `any`    |                   | Could be key, value or alias   |

```js

const marvelUniverse = new AliasMap();
const ironManUrl = 'https://en.wikipedia.org/wiki/Iron_Man';

marvelUniverse.set('Iron Man', ironManUrl);
marvelUniverse.setAlias('Iron Man', 'Anthony Edward Stark', 'Tony Stark');

// Get value by key
marvelUniverse.get('Iron Man'); // "https://en.wikipedia.org/wiki/Iron_Man"

// Get Value by alias
marvelUniverse.get('Tony Stark'); // "https://en.wikipedia.org/wiki/Iron_Man"

// Get primary key by value
marvelUniverse.get(ironManUrl); // "Iron Man"

```

***

#### `AliasMap.prototype.getEntry()`

Returns value if primary key or any of aliases provided and primary key if value provided.

| **Parameter** | **Type** | **Default value** | **Notes**                      |
|---------------|----------|-------------------|--------------------------------|
| `item`        | `any`    |                   | Could be key, value or alias   |

```js

const chemicalElements = new AliasMap();

chemicalElements.set('Potassium', 'K', 'Kalium');

chemicalElements.getEntry('Potassium'); // Entry {key: "Potassium", value: "K", aliases: Set(1)}
chemicalElements.getEntry('Kalium'); // Entry {key: "Potassium", value: "K", aliases: Set(1)}
chemicalElements.getEntry('K'); // Entry {key: "Potassium", value: "K", aliases: Set(1)}

```

***

#### `AliasMap.prototype.getPrimaryKey()`

Returns primary key for provided item. Item could be a key, value or any of aliases.

| **Parameter** | **Type** | **Default value** | **Notes**                      |
|---------------|----------|-------------------|--------------------------------|
| `item`        | `any`    |                   | Could be key, value or alias   |

```js

// Map country aliases to ISO alpha-2 code
const countries = new AliasMap();

countries.set('United Kingdom', 'gb');
countries.setAlias('gb', 'United Kingdom of Great Britain and Northern Ireland', 'UK', 'U.K.', 'Great Britain', 'Britain', 'GBR', 'England', 'Northern Ireland', 'Scotland', 'Wales');

countries.getPrimaryKey('gb'); // "United Kingdom"
countries.getPrimaryKey('Scotland'); // "United Kingdom"
countries.getPrimaryKey('United Kingdom'); // "United Kingdom"
countries.getPrimaryKey('USA'); // undefined

```

***

#### `AliasMap.prototype.getValue()`

Returns value for provided item. Item could be a key, value or any of aliases.

| **Parameter** | **Type** | **Default value** | **Notes**                      |
|---------------|----------|-------------------|--------------------------------|
| `item`        | `any`    |                   | Could be key, value or alias   |

```js

const coolDevelopers = new AliasMap();

const snigo = {
  name: 'Igor',
  job: 'Web Developer',
};

coolDevelopers.set('@snigo', snigo);
coolDevelopers.setAlias('@snigo', 'https://snigo.dev', 'https://github.com/snigo');

coolDevelopers.getValue('@snigo'); // { name: 'Igor', job: 'Web Developer' }
coolDevelopers.getValue('https://snigo.dev'); // { name: 'Igor', job: 'Web Developer' }
coolDevelopers.getValue(snigo); // { name: 'Igor', job: 'Web Developer' }
coolDevelopers.getValue('@bladeRunner'); // undefined

```

***

#### `AliasMap.prototype.getAliases()`

Returns all aliases for the provided item. Items could be a key, value or any of aliases. Returns empty array if no aliases are set for provided item.

| **Parameter** | **Type** | **Default value** | **Notes**                      |
|---------------|----------|-------------------|--------------------------------|
| `item`        | `any`    |                   | Could be key, value or alias   |

```js

const marvelUniverse = new AliasMap();

const wolverineUrl = 'https://en.wikipedia.org/wiki/Wolverine_(character)';
marvelUniverse.set('Wolverine', wolverineUrl);
marvelUniverse.setAlias('Wolverine', 'James Howlett', 'Logan', 'Weapon X');

marvelUniverse.getAliases('Wolverine'); // ['James Howlett', 'Logan', 'Weapon X']
marvelUniverse.getAliases('Logan'); // ['James Howlett', 'Logan', 'Weapon X']
marvelUniverse.getAliases(wolverineUrl); // ['James Howlett', 'Logan', 'Weapon X']

const blackPantherUrl = 'https://en.wikipedia.org/wiki/Black_Panther_(Marvel_Comics)';
marvelUniverse.set('Black Panther', blackPantherUrl);

marvelUniverse.getAliases('Black Panther'); // []

```

***

#### `AliasMap.prototype.has()`

Returns a boolean indicating whether the provided item is in AliasMap. AliasMap inherits this method from [Map.prototype.has](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has).


| **Parameter** | **Type** | **Default value** | **Notes**                      |
|---------------|----------|-------------------|--------------------------------|
| `item`        | `any`    |                   | Could be key, value or alias   |

```js

const aliasMap = new AliasMap();

aliasMap.set('foo', 'bar', 'baz');

aliasMap.has('foo'); // true
aliasMap.has('moo'); // false
aliasMap.has('baz'); // true
aliasMap.has('fuzz'); // false

```

#### `AliasMap.prototype.hasAlias()`

Returns boolean indicating whether provided primary key has provided alias. For performance reasons, to achieve constant time retrieval, provided item has to be a key.


| **Parameter** | **Type** | **Default value** | **Notes**                                   |
|---------------|----------|-------------------|---------------------------------------------|
| `item`        | `any`    |                   | Could be key, value or alias                |
| `alias`       | `any`    |                   |                                             |

```js

const colors = new AliasMap();

colors.set('cyan', '#ffff00', 'aqua');

colors.hasAlias('cyan', 'aqua'); // true
colors.hasAlias('#ffff00', 'aqua'); // true
colors.hasAlias('#ffff00', 'cyan'); // false

```

***

#### `AliasMap.prototype.set()`

Adds key, value and optional aliases to AlaisMap. Conforms with alias map descriptor rules. By default doesn't let any value to mutate, unless immutable flag of descriptor is set to false.

| **Parameter**  | **Type**  | **Default value** | **Notes**                                        |
|----------------|-----------|-------------------|--------------------------------------------------|
| `key`          |`any`      |                   |                                                  |
| `value`        |`any`      |                   |                                                  |
| `...aliases`   |`...any`   |                   | Optional list of aliases                         |

```js

const immutable = new AliasMap();

immutable.set('A', 'B', 'C'); // AliasMap{ 'A' => Entry, 'B' => Entry, 'C' => Entry }
immutable.set('A', 'D', 'E'); // Error: "Cannot reassign immutable entry."
immutable.set('A', 'B', 'D'); // AliasMap{ 'A' => Entry, 'B' => Entry, 'C' => Entry, 'D' => Entry }
mutable.getAliases('A'); // ['C', 'D']

const mutable = new AliasMap({ immutable: false });

mutable.set('A', 'B', 'C'); // AliasMap{ 'A' => Entry, 'B' => Entry, 'C' => Entry }
mutable.set('A', 'D', 'E'); // AliasMap{ 'A' => Entry, 'B' => Entry, 'C' => Entry, 'E' => Entry }
mutable.has('B'); // false
mutable.getAliases('A'); // ['C', 'E']

```

***

#### `AliasMap.prototype.setAlias()`

Adds alias to the entry of provided item. Returns updated list. Conforms to the immutability rule of descriptor in the same way `.set()` method does.

| **Parameter**  | **Type**  | **Default value** | **Notes**                                              |
|----------------|-----------|-------------------|--------------------------------------------------------|
| `item`         | `any`     |                   | Could be key, value or alias                           |
| `...aliases`   |`...any`   |                   | List of aliases.                                       |

```js

const aliasMap = new AliasMap();

aliasMap.set('A', 'B');

aliasMap.setAlias('A', 'C', 'D'); // AliasMap{ 'A' => Entry, 'B' => Entry, 'C' => Entry, 'D' => Entry }
aliasMap.getAliases('B'); // ['C', 'D']

```

***

#### `AliasMap.prototype.setOwnDescriptor()`

Sets new descriptor rules for the alias map.

| **Parameter**  | **Type**             | **Default value** | **Notes**                  |
|----------------|----------------------|-------------------|----------------------------|
| `descriptor`   | `AliasMapDescriptor` |                   |                            |

```js

const aliasMap = new AliasMap();

aliasMap.getOwnDescriptor(); // {strict: true, immutable: true}
aliasMap.setOwnDescriptor({ strict: false });
aliasMap.getOwnDescriptor(); // {strict: false, immutable: true}

```

***

#### `AliasMap.prototype.delete()`

Removes entry by provided item, where entry is a primary key, value and all the aliases associated with the key. Returns true if deletion was successful, otherwise - false.

| **Parameter** | **Type** | **Default value** | **Notes**                                      |
|---------------|----------|-------------------|------------------------------------------------|
| `item`        | `any`    |                   | Could be key, value or alias                   |

```js

const marvelUniverse = new AliasMap();

const ironManUrl = 'https://en.wikipedia.org/wiki/Iron_Man';
marvelUniverse.set('Iron Man', ironManUrl);
marvelUniverse.setAlias('Iron Man', 'Anthony Edward Stark', 'Tony Stark');

marvelUniverse.size; // 4
marvelUniverse.entriesCount; // 1

marvelUniverse.delete('Anthony Edward Stark'); // true

marvelUniverse.size; // 0
marvelUniverse.entriesCount; // 0

```

***

#### `AliasMap.prototype.deleteAlias()`

Removes alias from provided item. Returns true if deletion was successful, otherwise - false.

| **Parameter** | **Type** | **Default value** | **Notes**                                      |
|---------------|----------|-------------------|------------------------------------------------|
| `item`        | `any`    |                   | Either key, value or alias                     |
| `alias`       | `any`    |                   | Alias to be removed                            |

```js

const marvelUniverse = new AliasMap();

const ironManUrl = 'https://en.wikipedia.org/wiki/Iron_Man';
marvelUniverse.set('Iron Man', ironManUrl);
marvelUniverse.setAlias('Iron Man', 'Anthony Edward Stark', 'Tony Stark');

marvelUniverse.deleteAlias('Iron Man', 'Anthony Edward Stark'); // true

marvelUniverse.getAliases(ironManUrl); // ['Tony Stark']

```

***

#### `AliasMap.prototype.clear()`

Clears AliasMap by removing all items. Returns `undefined`.

```js

const marvelUniverse = new AliasMap();

const ironManUrl = 'https://en.wikipedia.org/wiki/Iron_Man';
marvelUniverse.set('Iron Man', ironManUrl);
marvelUniverse.setAlias('Iron Man', 'Anthony Edward Stark', 'Tony Stark');

marvelUniverse.clear();

marvelUniverse.size; // 0

```

***

#### `AliasMap.prototype.entries()`

Returns array of alias map entry objects.

```js

const marvelUniverse = new AliasMap();

const ironManUrl = 'https://en.wikipedia.org/wiki/Iron_Man';
marvelUniverse.set('Iron Man', ironManUrl);
marvelUniverse.setAlias('Iron Man', 'Anthony Edward Stark', 'Tony Stark');

marvelUniverse.entryCount; // 1
marvelUniverse.entries(); // [Entry{key: "Iron Man", value: "https://en.wikipedia.org/wiki/Iron_Man", aliases: Set(2)}]

```

***

#### `AliasMap.prototype.keys()`

Returns array of alias map primary keys.

```js

const marvelUniverse = new AliasMap();

const ironManUrl = 'https://en.wikipedia.org/wiki/Iron_Man';
marvelUniverse.set('Iron Man', ironManUrl);
marvelUniverse.setAlias('Iron Man', 'Anthony Edward Stark', 'Tony Stark');

const wolverineUrl = 'https://en.wikipedia.org/wiki/Wolverine_(character)';
marvelUniverse.set('Wolverine', wolverineUrl);
marvelUniverse.setAlias('Wolverine', 'James Howlett', 'Logan', 'Weapon X');

marvelUniverse.entryCount; // 2
marvelUniverse.keys(); // ["Iron Man", "Wolverine"]

```

***

#### `AliasMap.prototype.values()`

Returns array of alias map values.

```js

const swatch = new AliasMap();

swatch.set('gray', '#808080', 'grey');
swatch.set('pink', '#FFC0CB');

swatch.entryCount; // 2
swatch.values(); // ["#808080", "#FFC0CB"]

```

***

#### `AliasMap.prototype.forEach()`

Executes provided function on every entry of alias map. Whole entry, index of entry and array of all entries will be passed to callback function, similarly to Array.prototype.forEach.

| **Parameter** | **Type**   | **Default value** | **Notes**                                      |
|---------------|------------|-------------------|------------------------------------------------|
| `fn`          | `Function` |                   | Function to be executed on every entry         |
| `thisArg`     | `Object`   |                   | Value to use as `this` when executing `fn`.    |

```js

const swatch = new AliasMap();

swatch.set('gray', '#808080', 'grey');
swatch.set('pink', '#FFC0CB');

swatch.forEach((entry) => {
  console.log(`Color ${entry.key} has ${entry.aliases.size} aliases.`)
});
// Logs:
// "Color gray has 1 aliases."
// "Color pink has 0 aliases."

```