# lol-stats-api
[![NPM](https://nodei.co/npm/lol-stats-api-module.png)](https://nodei.co/npm/lol-stats-api-module/)

[![npm version](https://badge.fury.io/js/lol-stats-api-module.svg)](https://badge.fury.io/js/lol-stats-api-module)
[![dependencies Status](https://david-dm.org/danielsogl/lol-stats-api-module/status.svg)](https://david-dm.org/danielsogl/lol-stats-api-module)

A wrapper module for [League of Legends' official API](https://developer.riotgames.com/). In the documentation below there will be references to the official methods used for each method.

All methods can be either used with a `callback` method or as a `promise`

## Download
lol-stats-api is installable via:

- [GitHub](https://github.com/danielsogl/lol-stats-api-module) `git clone https://github.com/danielsogl/lol-stats-api-module.git`
- [npm](https://www.npmjs.com/package/lol-stats-api-module): `npm install lol-stats-api-module`


## Quick example
```js
const API = require('lol-stats-api-module');
const api = new API({
        key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        region: 'euw'
    });

```

### Using callbacks
```js

    const options = { name: 'Pupix' };

    api.getSummoner(options, (err, data) => {
        console.log(data);
    });
    //=> {
             "id": 20920441,
             "name": "Pupix",
             "profileIconId": 580,
             "summonerLevel": 30,
             "revisionDate": 1431200284000
         }
```

### Using promises
```js

    const options = { name: 'Pupix' };

    api.getSummoner(options).then(data => {
        console.log(data);
    });
    //=> {
             "id": 20920441,
             "name": 'Pupix',
             "profileIconId": 580,
             "summonerLevel": 30,
             "revisionDate": 1431200284000
         }
```

## Getting started

The API constructor accepts an *object* with the default `key` and `region` to be used for the API calls. You can get a key from [Riot Games' developer portal](https://developer.riotgames.com).

If no region is passed, the API will default to **na** (North America).

The possible *regions* are the following:

- **br** (Brazil)
- **eune** (Europe North-East)
- **euw** (Europe West)
- **jp** (Japan)
- **kr** (Korean)
- **lan** (Latin America North)
- **las** (Latin America South)
- **na** (North America)
- **oce** (Oceania)
- **ru** (Russia)
- **tr** (Turkish)
- **pbe** (Public Beta Environment)

## Documentation

Whenever possible, if a configuration *object* (referred as `options` in the documentation) is not required the `callback` can be passed directly as first parameter to all methods.

### Methods

**Account**
* [getAccountMatchlist](#getAccountMatchlist)
* [getAccountRecentMatchlist](#getAccountRecentMatchlist)

**Champions**
* [getChampionsStatus](#getChampionsStatus)

**Featured games**
* [getFeaturedGames](#getFeaturedGames)

**Leagues**
* [getChallengerLeague](#getChallengerLeague)
* [getMasterLeague](#getMasterLeague)

**Matches**
* [getMatch](#getMatch)
* [getMatchTimeline](#getMatchTimeline)

**Static data**
* [getChampionsStaticData](#getChampionsStaticData)
* [getItemsStaticData](#getItemsStaticData)
* [getLanguagesStaticData](#getLanguagesStaticData)
* [getLanguageStringsStaticData](#getLanguageStringsStaticData)
* [getMapsStaticData](#getMapsStaticData)
* [getMasteriesStaticData](#getMasteriesStaticData)
* [getProfileIconsStaticData](#getProfileIconsStaticData)
* [getRealmsStaticData](#getRealmsStaticData)
* [getRunesStaticData](#getRunesStaticData)
* [getSummonerSpellsStaticData](#getSummonerSpellsStaticData)
* [getVersionsStaticData](#getVersionsStaticData)

**Status**
* [getStatus](#getStatus)

**Summoner**
* [getSummoner](#getSummoner)
* [getSummonerActiveGame](#getSummonerActiveGame)
* [getSummonerChampionMastery](#getSummonerChampionMastery)
* [getSummonerChampionMasteryScore](#getSummonerChampionMasteryScore)
* [getSummonerLeagues](#getSummonerLeagues)
* [getSummonerLeaguePositions](#getSummonerLeaguePositions)
* [getSummonerMasteries](#getSummonerMasteries)
* [getSummonerRunes](#getSummonerRunes)

---------------------------------------

<a name="getAccountMatchlist" />

### getAccountMatchlist(options, callback)

Get matchlist for ranked games played on given account ID and platform ID and filtered using given filter parameters, if any.

**Parameters**

1. **options** *{Object}*
 * **options.accountId** *{number | string}* The account ID.
 * **[options.beginIndex]** *{number | string}* The begin index to use for filtering matchlist.
 * **[options.beginTime]** *{number | string}* The begin time to use for filtering matchlist specified as epoch milliseconds.
 * **[options.champion]** *{Array | number | string}* Set of champion IDs for which to filtering matchlist.
 * **[options.endIndex]** *{number | string}* The end index to use for filtering matchlist.
 * **[options.endTime]** *{number | string}* The end time to use for filtering matchlist specified as epoch milliseconds.
 * **[options.season]** *{Array | number | string}* Set of season IDs for which to filtering matchlist.
 * **[options.queue]** *{Array | number | string}* Set of queue IDs for which to filtering matchlist.
 * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
 * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.


<a name="getAccountRecentMatchlist" />

### getAccountRecentMatchlist(options, callback)

Get matchlist for last 20 matches played on given account ID.

**Parameters**

1. **options** *{Object}*
 * **options.accountId** *{number | string}* The account ID.
 * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
 * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getChampionsStatus" />

### getChampionsStatus(options, callback)

Gets the status of champions.

**Parameters**

1. **options** *{Object}*
 * **[options.id]** *{boolean}* Optional parameter to retrieve only a specific champion.
 * **[options.freeToPlay]** *{boolean}* Optional filter to retrieve only free to play champions.
 * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
 * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getFeaturedGames" />

### getFeaturedGames(options, callback)

Get list of featured games.

**Parameters**

1. **options** *{Object}*
 * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
 * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getChallengerLeague" />

### getChallengerLeague(options, callback)

Get the challenger league for a given queue.

**Parameters**

1. **options** *{Object}*
 * **[options.queue = "RANKED_SOLO_5x5"]** *{string}* Game queue type.
     * Possible values: *"RANKED_SOLO_5x5" | "RANKED_FLEX_SR" | "RANKED_FLEX_TT"*
 * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
 * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.


<a name="getMasterLeague" />

### getMasterLeague(options, callback)

Get the master league for a given queue.

**Parameters**

1. **options** *{Object}*
 * **[options.queue = "RANKED_SOLO_5x5"]** *{string}* Game queue type.
     * Possible values: *"RANKED_SOLO_5x5" | "RANKED_FLEX_SR" | "RANKED_FLEX_TT"*
 * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
 * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getMatch" />

### getMatch(options, callback)

Get match by match ID.

**Parameters**

1. **options** *{Object}*
 * **options.id** *{number | string}* The match ID.
 * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
 * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.


<a name="getMatchTimeline" />

### getMatchTimeline(options, callback)

Get match by match ID.

**Parameters**

1. **options** *{Object}*
 * **options.matchId** *{number | string}* The match ID.
 * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
 * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getChampionsStaticData" />

### getChampionsStaticData(options, callback)

Gets static data of champions.

**Parameters**

1. **[options]** *{Object}*
    * **[options.id]** *{number | string}* Champion ID to retrieve.
    * **[options.locale]** *{string}* Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[options.version]** *{string}* Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[options.dataById]** *{boolean}* If specified, the returned data map will use the champions' Id as the keys. If not specified or specified as false, the returned data map will use the champions' keys instead.
    * **[options.champData]** *{Array | string}* Tags to return additional data. Only id, key, name, and title are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
        * Possible values: *"all" | "allytips" | "altimages" | "blurb" | "enemytips" | "image" | "info" | "lore" | "partype" | "passive" | "recommended" | "skins" | "spells" | "stats" | "tags"*
    * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
    * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.


<a name="getItemsStaticData" />

### getItemsStaticData(options, callback)

Gets static data of items.

**Parameters**

1. **[options]** *{Object}*
    * **[options.id]** *{number | string}* Item ID to retrieve.
    * **[options.locale]** *{string}* Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[options.version]** *{string}* Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[options.itemData]** *{Array | string}* Tags to return additional data. Only id, name, plaintext, group, and description are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
        * Possible values: *"all" | "colloq" | "consumeOnFull" | "consumed" | "depth" | "effect" | "from" | "gold" | "hideFromAll" | "image" | "inStore" | "into" | "maps" | "requiredChampion" | "sanitizedDescription" | "specialRecipe" | "stacks" | "stats" | "tags"*
    * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
    * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.


<a name="getLanguageStringsStaticData" />

### getLanguageStringsStaticData(options, callback)

Gets static data of items.

**Parameters**

1. **[options]** *{Object}*
    * **[options.locale]** *{string}* Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[options.version]** *{string}* Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
    * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.


<a name="getLanguagesStaticData" />

### getLanguagesStaticData(options, callback)

Gets the list of languages.

**Parameters**

1. **[options]** *{Object}*
    * **[options.locale]** *{string}* Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[options.version]** *{string}* Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
    * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.


<a name="getMapsStaticData" />

### getMapsStaticData(options, callback)

Gets the list of maps.

**Parameters**

1. **[options]** *{Object}*
    * **[options.locale]** *{string}* Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[options.version]** *{string}* Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
    * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.


<a name="getMasteriesStaticData" />

### getMasteriesStaticData(options, callback)

Gets static data of masteries.

**Parameters**

1. **[options]** *{Object}*
    * **[options.id]** *{number | string}* Mastery ID to retrieve.
    * **[options.locale]** *{string}* Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[options.version]** *{string}* Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[options.masteryData]** *{Array | string}* Tags to return additional data. Only id, name, and description are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
        * Possible values: *"all" | "image" | "masteryTree" | "prereq" | "ranks" | "sanitizeDescription"*
    * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
    * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.


<a name="getProfileIconsStaticData" />

### getProfileIconsStaticData(options, callback)

Gets the list of profile icons.

**Parameters**

1. **[options]** *{Object}*
    * **[options.locale]** *{string}* Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[options.version]** *{string}* Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
    * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.


<a name="getRealmsStaticData" />

### getRealmsStaticData(options, callback)

Gets the list of realms.

**Parameters**

1. **[options]** *{Object}*
    * **[options.locale]** *{string}* Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[options.version]** *{string}* Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
    * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.


<a name="getRunesStaticData" />

### getRunesStaticData(options, callback)

Gets static data of ruunes.

**Parameters**

1. **[options]** *{Object}*
    * **[options.id]** *{number | string}* Mastery ID to retrieve.
    * **[options.locale]** *{string}* Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[options.version]** *{string}* Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[options.runeData]** *{Array | string}* Tags to return additional data. Only id, name, rune, and description are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
        * Possible values: *"all" | "colloq" | "consumeOnFull" | "consumed" | "depth" | "from" | "gold" | "hideFromAll" | "image" | "inStore" | "into" | "maps" | "requiredChampion" | "sanitizedDescription" | "specialRecipe" | "stacks" | "stats" | "tags"*
    * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
    * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.


<a name="getSummonerSpellsStaticData" />

### getSummonerSpellsStaticData(options, callback)

Gets static data of champions.

**Parameters**

1. **[options]** *{Object}*
    * **[options.id]** *{number | string}* SummonerSpell ID to retrieve.
    * **[options.locale]** *{string}* Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[options.version]** *{string}* Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[options.dataById]** *{boolean}* If specified, the returned data map will use the champions' Id as the keys. If not specified or specified as false, the returned data map will use the champions' keys instead.
    * **[options.spellData]** *{Array | string}* Tags to return additional data. Only type, version, data, id, key, name, description, and summonerLevel are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
        * Possible values: *"all" | "cooldown" | "cooldownBurn" | "cost" | "costBurn" | "costType" | "effect" | "effectBurn" | "image" | "key" | "leveltip" | "maxrank" | "modes" | "range" | "rangeBurn" | "resource" | "sanitizedDescription" | "sanitizedTooltip" | "tooltip" | "vars"*
    * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
    * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.


<a name="getVersionsStaticData" />

### getVersionsStaticData(options, callback)

Gets the list of realms.

**Parameters**

1. **[options]** *{Object}*
    * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
    * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getStatus" />

### getStatus(options, callback)

Get League of Legends status.

**Parameters**

1. **options** *{Object}*
 * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
 * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getSummoner" />

### getSummoner(options, callback)

Gets summoner based on id, accountId or name.

**Parameters**

1. **options** *{Object}*
 * **[options.id]** *{number | string}* The ID of the summoner.
 * **[options.summonerId]** *{number | string}* The ID of the summoner.
 * **[options.accountId]** *{number | string}* The account ID of the summoner.
 * **[options.name]** *{string}* The name of the summoner.
 * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
 * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.


<a name="getSummonerActiveGame" />

### getSummonerActiveGame(options, callback)

Get current game information for the given summoner ID.

**Parameters**

1. **options** *{Object}*
 * **options.summonerId** *{number | string}* The ID of the summoner.
 * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
 * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.


<a name="getSummonerChampionMastery" />

### getSummonerChampionMastery(options, callback)

Get champion mastery entries sorted by number of champion points descending.

**Parameters**

1. **options** *{Object}*
 * **options.summonerId** *{number | string}* Summoner ID associated with the player.
 * **[options.championId]** *{number | string}* Champion ID to retrieve Champion Mastery for.
 * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
 * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.


<a name="getSummonerChampionMasteryScore" />

### getSummonerChampionMasteryScore(options, callback)

Get a player's total champion mastery score, which is the sum of individual champion mastery levels.

**Parameters**

1. **options** *{Object}*
 * **options.summonerId** *{number | string}* Summoner ID associated with the player.
 * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
 * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.


<a name="getSummonerLeagues" />

### getSummonerLeagues(options, callback)

Get leagues in all queues for a given summoner ID.

**Parameters**

1. **options** *{Object}*
 * **options.summonerId** *{number | string}* Summoner ID associated with the player.
 * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
 * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.


<a name="getSummonerLeaguePositions" />

### getSummonerLeaguePositions(options, callback)

Get league positions in all queues for a given summoner ID.

**Parameters**

1. **options** *{Object}*
 * **options.summonerId** *{number | string}* Summoner ID associated with the player.
 * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
 * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.


<a name="getSummonerMasteries" />

### getSummonerMasteries(options, callback)

Get mastery pages for a given summoner ID.

**Parameters**

1. **options** *{Object}*
 * **options.summonerId** *{number | string}* Summoner ID associated with the player.
 * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
 * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.


<a name="getSummonerRunes" />

### getSummonerRunes(options, callback)

Get rune pages for a given summoner ID.

**Parameters**

1. **options** *{Object}*
 * **options.summonerId** *{number | string}* Summoner ID associated with the player.
 * **[options.region]** *{string}* Optional region to be used instead of the API's region to retrieve data.
 * **[options.apiKey]** *{string}* Optional key to be used instead of the API's key to retrieve data.
2. **[callback]** *{Function}* Optional function to be called after the server's response is received, with `(error, data)` as parameters.
