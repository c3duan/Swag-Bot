const XP = require('expandjs');
const request = require('request');

/**************************************************************************/

/**
 * A map with the current version of each one of the League of Legends official API
 *
 * @type {Object}
 * @private
 */
const versions = {
    championMastery: 'v3',
    champions: 'v3',
    league: 'v3',
    status: 'v3',
    masteries: 'v3',
    match: 'v3',
    runes: 'v3',
    spectator: 'v3',
    staticData: 'v3',
    summoner: 'v3',
    thirdParty: 'v3'
};

/**
 * A list of available regions of the League of Legends official API
 *
 * @type {Object}
 * @private
 */
const regions = ['br', 'eune', 'euw', 'jp', 'kr', 'lan', 'las', 'na', 'oce', 'ru', 'tr', 'pbe'];

/**
 * A map of the available endpoints for of each region of the League of Legends official API
 *
 * @type {Object}
 * @private
 */
const endpoints = {
    br: {
        platform: 'BR1',
        host: 'br1.api.riotgames.com'
    },
    eune: {
        platform: 'EUN1',
        host: 'eun1.api.riotgames.com'
    },
    euw: {
        platform: 'EUW1',
        host: 'euw1.api.riotgames.com'
    },
    jp: {
        platform: 'JP1',
        host: 'jp1.api.riotgames.com'
    },
    kr: {
        platform: 'KR',
        host: 'kr.api.riotgames.com'
    },
    lan: {
        platform: 'LA1',
        host: 'la1.api.riotgames.com'
    },
    las: {
        platform: 'LA2',
        host: 'la2.api.riotgames.com'
    },
    na: {
        platform: 'NA1',
        host: 'na1.api.riotgames.com'
    },
    oce: {
        platform: 'OC1',
        host: 'oc1.api.riotgames.com'
    },
    tr: {
        platform: 'TR1',
        host: 'tr1.api.riotgames.com'
    },
    ru: {
        platform: 'RU',
        host: 'ru.api.riotgames.com'
    },
    pbe: {
        platform: 'PBE1',
        host: 'pbe1.api.riotgames.com'
    },
    global: {
        platform: '',
        host: 'global.api.riotgames.com'
    }
};

/**************************************************************************/

/**
 * A wrapper for League of Legends' official API
 *
 * @class RiotAPI
 * @type {Function}
 */
module.exports = new XP.Class('RiotAPI', {

    /**
     * Initialize
     *
     * @param {Object} options
     *  @param {string} options.key - The default key to be used for the API calls
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data. - The default region to be used for the API calls
     * @constructs
     * @throws
     */
    initialize(options) {
        XP.assertArgument(XP.isObject(options, true), 1, 'Object');
        XP.assertOption(XP.isString(options.key), 'options.key', 'string');

        this.key = options.key;
        this.region = options.region || 'na';
    },

    /**********************************************************************/

    /**
     * Gets the status of champions.
     *
     * @method getChampionsStatus
     * @param {Object} [options]
     *   @param {boolean} [options.id] Optional parameter to retrieve only a specific champion.
     *   @param {boolean} [options.freeToPlay] Optional filter param to retrieve only free to play champions.
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data. Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data. Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group champions
     */
    getChampionsStatus: {
        callback: true,
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options) || XP.isVoid(options), 1, 'Object or void');
            XP.assertOption(XP.isString(options.id) || XP.isNumber(options.id) || XP.isVoid(options.id), 'options.id', 'number, string or void');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/platform/${this._getVersion('champions')}/champions`,
                query: {
                    freeToPlay: !!options.freeToPlay
                }
            };

            if (options.id) {
                urlOptions.path += `/${options.id}`;
            }

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**********************************************************************/

    /**
     * Get all champion mastery entries sorted by number of champion points descending.
     *
     * @method getSummonerChampionMastery
     * @param {Object} options
     *   @param {string | number} options.summonerId Summoner ID associated with the player.
     *   @param {string | number} [options.championId] Champion ID to retrieve Champion Mastery for
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data. Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data. Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group championMastery
     */
    getSummonerChampionMastery: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options), 1, 'Object');
            XP.assertOption(XP.isString(options.summonerId) || XP.isNumber(options.summonerId), 'options.summonerId', 'number or string');
            XP.assertOption(XP.isString(options.championId) || XP.isNumber(options.championId) || XP.isVoid(options.championId), 'options.championId', 'number, string or void');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/champion-mastery/${this._getVersion('championMastery')}/champion-masteries/by-summoner/${options.summonerId}`
            };

            if (options.championId) {
                urlOptions.path += `/by-champion/${options.championId}`;
            }

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**
     * Get a player's total champion mastery score, which is the sum of individual champion mastery levels.
     *
     * @method getSummonerChampionMasteryScore
     * @param {Object} options
     *   @param {string | number} options.summonerId Summoner ID associated with the player
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data. Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data. Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group championMastery
     */
    getSummonerChampionMasteryScore: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options), 1, 'Object');
            XP.assertOption(XP.isString(options.summonerId) || XP.isNumber(options.summonerId), 'options.summonerId', 'number or string');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/champion-mastery/${this._getVersion('championMastery')}/scores/by-summoner/${options.summonerId}`
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**********************************************************************/

    /**
     * Get leagues in all queues for a given summoner ID.
     *
     * @method getSummonerLeagues
     * @param {Object} options
     *   @param {string | number} options.summonerId Summoner ID associated with the player
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data. Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data. Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group league
     */
    getSummonerLeagues: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options), 1, 'Object');
            XP.assertOption(XP.isNumber(options.summonerId) || XP.isString(options.summonerId), 'options.summonerId', 'number or string');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/league/${this._getVersion('league')}/leagues/by-summoner/${options.summonerId}`
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**
     * Get league positions in all queues for a given summoner ID.
     *
     * @method getSummonerLeaguePositions
     * @param {Object} options
     *   @param {string | number} options.summonerId Summoner ID associated with the player
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data. Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data. Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group league
     */
    getSummonerLeaguePositions: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options), 1, 'Object');
            XP.assertOption(XP.isNumber(options.summonerId) || XP.isString(options.summonerId), 'options.summonerId', 'number or string');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/league/${this._getVersion('league')}/positions/by-summoner/${options.summonerId}`
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**
     * Get the challenger league for a given queue
     *
     * @method getChallengerLeague
     * @param {Object} [options]
     *  @param {string} [options.queue = RANKED_SOLO_5x5] Game queue type.
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data. Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data. Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group league
     */
    getChallengerLeague: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options) || XP.isVoid(options), 1, 'Object or void');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/league/${this._getVersion('league')}/challengerleagues/by-queue/${options.queue || 'RANKED_SOLO_5x5'}`
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**
     * Get the master league for a given queue.
     *
     * @method getMasterLeague
     * @param {Object} [options]
     *  @param {string} [options.queue = RANKED_SOLO_5x5] Game queue type.
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data. Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data. Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group league
     */
    getMasterLeague: {
        callback: true,
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options) || XP.isVoid(options), 1, 'Object or void');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/league/${this._getVersion('league')}/masterleagues/by-queue/${options.queue || 'RANKED_SOLO_5x5'}`
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**********************************************************************/

    /**
     * Get League of Legends status.
     *
     * @method getStatus
     * @param {Object} [options]
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data. Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data. Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group status
     */
    getStatus: {
        callback: true,
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options) || XP.isVoid(options), 1, 'Object or void');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/status/${this._getVersion('status')}/shard-data`
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**********************************************************************/

    /**
     * Get mastery pages for a given summoner ID.
     *
     * @method getSummonerMasteries
     * @param {Object} options
     *   @param {string | number} options.summonerId Summoner ID associated with the player
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data. Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data. Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group masteries
     */
    getSummonerMasteries: {
        callback: true,
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options), 1, 'Object');
            XP.assertOption(XP.isString(options.summonerId) || XP.isNumber(options.summonerId), 'options.summonerId', 'string');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/platform/${this._getVersion('masteries')}/masteries/by-summoner/${options.summonerId}`
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**********************************************************************/

    /**
     * Get matchlist for ranked games played on given account ID and
     * platform ID and filtered using given filter parameters, if any.
     *
     * @method getAccountMatchlist
     * @param {Object} options
     *  @param {number | string} options.accountId The account ID.
     *  @param {number | string} [options.beginIndex] The begin index to use for filtering matchlist.
     *  @param {number | string} [options.beginTime] The begin time to use for filtering matchlist specified as epoch milliseconds.
     *  @param {Array | number | string} [options.champion] Set of champion IDs for which to filtering matchlist.
     *  @param {number | string} [options.endIndex] The end index to use for filtering matchlist.
     *  @param {number | string} [options.endTime] The end time to use for filtering matchlist specified as epoch milliseconds.
     *  @param {Array | number | string} [options.season] Set of season IDs for which to filtering matchlist.
     *  @param {Array | number | string} [options.queue] Set of queue IDs for which to filtering matchlist.
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group match
     */
    getAccountMatchlist: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options), 1, 'Object');
            XP.assertOption(XP.isString(options.accountId) || XP.isNumber(options.accountId), 'options.accountId', 'number or string');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/match/${this._getVersion('match')}/matchlists/by-account/${options.accountId}`,
                query: {
                    queue: options.queue,
                    beginTime: options.beginTime,
                    endIndex: options.endIndex,
                    season: options.season,
                    champion: options.champion,
                    beginIndex: options.beginIndex,
                    endTime: options.endTime
                }
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**
     * Get matchlist for last 20 matches played on given account ID.
     *
     * @method getAccountRecentMatchlist
     * @param {Object} options
     *  @param {number | string} options.accountId The account ID.
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group match
     */
    getAccountRecentMatchlist: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options), 1, 'Object');
            XP.assertOption(XP.isString(options.accountId) || XP.isNumber(options.accountId), 'options.accountId', 'number or string');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/match/${this._getVersion('match')}/matchlists/by-account/${options.accountId}/recent`
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**
     * Get match by match ID.
     *
     * @method getMatch
     * @param {Object} options
     *  @param {string | number} options.id The match ID.
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group match
     */
    getMatch: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options), 1, 'Object');
            XP.assertOption(XP.isString(options.id) || XP.isNumber(options.id), 'options.id', 'number or string');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/match/${this._getVersion('match')}/matches/${options.id}`
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**
     * Get match timeline by match ID
     *
     * @method getMatchTimeline
     * @param {Object} options
     *  @param {number | string} options.matchId The match ID.
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group matchList
     */
    getMatchTimeline: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options), 1, 'Object');
            XP.assertOption(XP.isString(options.matchId) || XP.isNumber(options.matchId), 'options.matchId', 'number or string');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/match/${this._getVersion('match')}/timelines/by-match/${options.matchId}`
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**
     * TODO
     *
     * Add /lol/match/v3/matches/by-tournament-code/{tournamentCode}/ids
     * Add /lol/match/v3/matches/{matchId}/by-tournament-code/{tournamentCode}
     */

    /**********************************************************************/

    /**
     * Get rune pages for a given summoner ID.
     *
     * @method getSummonerRunes
     * @param {Object} options
     *  @param {number | string} options.summonerId
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group summoner
     */
    getSummonerRunes: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options), 1, 'Object');
            XP.assertOption(XP.isString(options.summonerId) || XP.isNumber(options.summonerId), 'options.summonerId', 'string');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/platform/${this._getVersion('runes')}/runes/by-summoner/${options.summonerId}`
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**********************************************************************/

    /**
     * Get current game information for the given summoner ID.
     *
     * @method getActiveGame
     * @param {Object} options
     *  @param {string | number} options.summonerId The ID of the summoner.
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group spectator
     */
    getSummonerActiveGame: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options), 1, 'Object');
            XP.assertOption(XP.isString(options.summonerId) || XP.isNumber(options.summonerId), 'options.summonerId', 'number or string');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/spectator/${this._getVersion('spectator')}/active-games/by-summoner/${options.summonerId}`
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**
     * Get list of featured games.
     *
     * @method getFeaturedGames
     * @param {Object} [options]
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group spectator
     */
    getFeaturedGames: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options) || XP.isVoid(options), 1, 'Object or void');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/spectator/${this._getVersion('spectator')}/featured-games`
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**********************************************************************/

    /**
     * Gets static data of champions.
     *
     * @method getChampionsStaticData
     * @param {Object} [options]
     *  @param {string} [options.id] Champion ID to retrieve.
     *  @param {Array | string} [options.champData] Tags to return additional data. Only id, key, name, and title are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
     *  @param {string} [options.dataById] If specified, the returned data map will use the champions' Id as the keys. If not specified or specified as false, the returned data map will use the champions' keys instead.
     *  @param {string} [options.locale] Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
     *  @param {string} [options.version] Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group staticData
     */
    getChampionsStaticData: {
        callback: true,
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options) || XP.isVoid(options), 1, 'Object or void');
            XP.assertOption(XP.isString(options.id) || XP.isNumber(options.id) || XP.isVoid(options.id), 'options.id', 'number, string or void');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/static-data/${this._getVersion('staticData')}/champions`,
                query: {
                    version: options.version,
                    champListData: options.champData,
                    dataById: !!options.dataById,
                    locale: options.locale
                }
            };

            if (options.id) {
                urlOptions.path += `/${options.id}`;
                urlOptions.query.champData = options.champData;
            }

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**
     * Gets static data of items
     *
     * @method getItemsStaticData
     * @param {Object} [options]
     *  @param {string} [options.id] Item ID to retrieve.
     *  @param {Array | string} [options.itemData] Tags to return additional data. Only id, name, plaintext, group, and description are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data.
     *  @param {string} [options.version] Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group staticData
     */
    getItemsStaticData: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options) || XP.isVoid(options), 1, 'Object or void');
            XP.assertOption(XP.isString(options.id) || XP.isNumber(options.id) || XP.isVoid(options.id), 'options.id', 'number, string or void');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/static-data/${this._getVersion('staticData')}/items`,
                query: {
                    version: options.version,
                    itemListData: options.itemData,
                    locale: options.locale
                }
            };

            if (options.id) {
                urlOptions.path += `/${options.id}`;
                urlOptions.query.itemData = options.itemData;
            }

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**
     * Gets the language strings.
     *
     * @method getLanguageStringsStaticData
     * @param {Object} [options]
     *  @param {string} [options.locale] Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
     *  @param {string} [options.version] Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group staticData
     */
    getLanguageStringsStaticData: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options) || XP.isVoid(options), 1, 'Object or void');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/static-data/${this._getVersion('staticData')}/language-strings`,
                query: {
                    version: options.version,
                    locale: options.locale
                }
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**
     * Gets the list of languages.
     *
     * @method getLanguagesStaticData
     * @param {Object} [options]
     *  @param {string} [options.version] Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
     *  @param {string} [options.locale] Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group staticData
     */
    getLanguagesStaticData: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options) || XP.isVoid(options), 1, 'Object or void');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/static-data/${this._getVersion('staticData')}/languages`
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**
     * Gets the list of maps.
     *
     * @method getMapsStaticData
     * @param {Object} [options]
     *  @param {string} [options.locale] Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
     *  @param {string} [options.version] Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group staticData
     */
    getMapsStaticData: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options) || XP.isVoid(options), 1, 'Object or void');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/static-data/${this._getVersion('staticData')}/maps`,
                query: {
                    version: options.version,
                    locale: options.locale
                }
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**
     * Gets static data of masteries.
     *
     * @method getMasteriesStaticData
     * @param {Object} [options]
     *  @param {string} [options.id] Mastery ID to retrieve.
     *  @param {Array | string} [options.masteryData] Tags to return additional data. Only id, name, and description are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data.
     *  @param {string} [options.locale] Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
     *  @param {string} [options.version] Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group staticData
     */
    getMasteriesStaticData: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options) || XP.isVoid(options), 1, 'Object or void');
            XP.assertOption(XP.isString(options.id) || XP.isNumber(options.id) || XP.isVoid(options.id), 'options.id', 'number, string or void');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/static-data/${this._getVersion('staticData')}/masteries`,
                query: {
                    version: options.version,
                    masteryListData: options.masteryData,
                    locale: options.locale
                }
            };

            if (options.id) {
                urlOptions.path += `/${options.id}`;
                urlOptions.query.masteryData = options.masteryData;
            }

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**
     * Gets the list of profile icons.
     *
     * @method getProfileIconsStaticData
     * @param {Object} [options]
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group staticData
     */
    getProfileIconsStaticData: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options) || XP.isVoid(options), 1, 'Object or void');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/static-data/${this._getVersion('staticData')}/profile-icons`,
                query: {
                    version: options.version,
                    locale: options.locale
                }
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },
    /**
     * Gets the list of realms.
     *
     * @method getRealmsStaticData
     * @param {Object} [options]
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group staticData
     */
    getRealmsStaticData: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options) || XP.isVoid(options), 1, 'Object or void');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/static-data/${this._getVersion('staticData')}/realms`
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**
     * Gets static data of runes
     *
     * @method getRunesStaticData
     * @param {Object} [options]
     *  @param {string} [options.id] Rune ID to retrieve.
     *  @param {Array | string} [options.runeData] Tags to return additional data. Only id, name, rune, and description are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
     *  @param {string} [options.locale] Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
     *  @param {string} [options.version] Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group staticData
     */
    getRunesStaticData: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options) || XP.isVoid(options), 1, 'Object or void');
            XP.assertOption(XP.isString(options.id) || XP.isNumber(options.id) || XP.isVoid(options.id), 'options.id', 'number, string or void');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/static-data/${this._getVersion('staticData')}/runes`,
                query: {
                    version: options.version,
                    runeListData: options.runeData,
                    locale: options.locale
                }
            };

            if (options.id) {
                urlOptions.path += `/${options.id}`;
                urlOptions.query.runeData = options.runeData;
            }

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**
     * Gets static data of summoner spells
     *
     * @method getSummonerSpellsStaticData
     * @param {Object} [options]
     *  @param {string} [options.id] SummonerSpell ID to retrieve.
     *  @param {Array | string} [options.spellData] Tags to return additional data. Only type, version, data, id, key, name, description, and summonerLevel are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
     *  @param {string} [options.dataById] If specified, the returned data map will use the champions' Id as the keys. If not specified or specified as false, the returned data map will use the champions' keys instead.
     *  @param {string} [options.locale] Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
     *  @param {string} [options.version] Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group staticData
     */
    getSummonerSpellsStaticData: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options) || XP.isVoid(options), 1, 'Object or void');
            XP.assertOption(XP.isString(options.id) || XP.isNumber(options.id) || XP.isVoid(options.id), 'options.id', 'number, string or void');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/static-data/${this._getVersion('staticData')}/summoner-spells`,
                query: {
                    version: options.version,
                    spellListData: options.spellData,
                    dataById: !!options.dataById,
                    locale: options.locale
                }
            };

            if (options.id) {
                urlOptions.path += `/${options.id}`;
                urlOptions.query.spellData = options.spellData;
            }

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**
     * Gets the list of versions
     *
     * @method getVersionsStaticData
     * @param {Object} [options]
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group staticData
     */
    getVersionsStaticData: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options) || XP.isVoid(options), 1, 'Object or void');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/static-data/${this._getVersion('staticData')}/versions`
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**********************************************************************/

    /**
     * Gets summoner based on summonerId, accountId or name.
     *
     * @method getSummoner
     * @param {Object} options
     *  @param {number | string} [options.id] The summoner ID.
     *  @param {number | string} [options.accountId] The account ID.
     *  @param {number | string} [options.name] The summoner name.
     *  @param {string} [options.region] Optional region to be used instead of the API's region to retrieve data.
     *  @param {string} [options.apiKey] Optional key to be used instead of the API's key to retrieve data.
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters.
     * @promise
     * @group summoner
     */
    getSummoner: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options), 1, 'Object');
            XP.assertOption(XP.isString(options.id) || XP.isNumber(options.id) || XP.isVoid(options.id), 'options.id', 'string, number or void');
            XP.assertOption(XP.isString(options.summonerId) || XP.isNumber(options.summonerId) || XP.isVoid(options.summonerId), 'options.summonerId', 'string, number or void');
            XP.assertOption(XP.isString(options.accountId) || XP.isNumber(options.accountId) || XP.isVoid(options.accountId), 'options.accountId', 'string, number or void');
            XP.assertOption(XP.isString(options.name) || XP.isVoid(options.name), 'options.name', 'string or void');

            const urlOptions = {
                path: `/lol/summoner/${this._getVersion('summoner')}/summoners`
            };

            if (options.id || options.summonerId) {
                urlOptions.path += `/${options.id || options.summonerId}`;
            } else if (options.accountId) {
                urlOptions.path += `/by-account/${options.accountId}`;
            } else if (options.name) {
                urlOptions.path += `/by-name/${encodeURIComponent(options.name)}`;
            }

            this._executeRequest(urlOptions, options, callback);
        }
    },

    getThirdPartyCode: {
        promise: true,
        value(options, callback) {
            XP.assertArgument(XP.isObject(options), 1, 'Object');
            XP.assertOption(XP.isString(options.summonerId) || XP.isNumber(options.summonerId), 'options.summonerId', 'string');
            XP.assertArgument(XP.isFunction(callback) || XP.isVoid(callback), 2, 'Function or void');

            const urlOptions = {
                path: `/lol/platform/${this._getVersion('thirdParty')}/third-party-code/by-summoner//${options.summonerId}`
            };

            this._executeRequest(urlOptions, options, callback);
        }
    },

    /**********************************************************************/

    /**
     * TODO
     *
     * Add https://developer.riotgames.com/api-methods/#tournament-v3
     * Add https://developer.riotgames.com/api-methods/#tournament-stub-v3
     */

    /**********************************************************************/

    /**
     * Returns the version of an API group
     *
     * @param {string} group The API group
     * @returns {string} The version
     * @private
     */
    _getVersion(group) {
        return versions[group];
    },

    /**
     * Returns the host for the passed version
     *
     * @param {string} region The League of Legends region
     * @returns {string} The host
     * @private
     */
    _getRegionHost(region) {
        return endpoints[region] && endpoints[region].host;
    },

    /**
     * Returns the platform for the passed version
     *
     * @param {string} region The League of Legends region
     * @returns {string} The host
     * @private
     */
    _getRegionPlatform(region) {
        return endpoints[region] && endpoints[region].platform;
    },

    /**
     * Checks whether or not the passed region is valid
     *
     * @param {string} region The League of Legends region
     * @returns {boolean} The region's validity
     * @private
     */
    _isRegionValid(region) {
        return regions.includes(region);
    },

    /**
     * Generic requests executor.
     *
     * @param {Object} urlOptions Internal API options
     *  @param {string} urlOptions.path The request's path
     *  @param {Object} [urlOptions.query] The request's query
     * @param {Object} userOptions Options coming from the API's user
     * @param {Function} [callback] Optional function to be called after the server's response is received, with `(error, data)` as parameters. A generic callback function
     * @private
     */
    _executeRequest(urlOptions, userOptions, callback) {
        const region = XP.lowerCase(userOptions.region || this.region);

        if (!this._isRegionValid(region)) {
            callback(new XP.InvalidError('region'), null);
            return;
        }

        const host = this._getRegionHost(region);

        const requestOptions = {
            url: `https://${host}${urlOptions.path}`,
            headers: {
                'X-Riot-Token': userOptions.apiKey || this.key
            },
            json: true,
            qs: Object.assign({
                platformId: this._getRegionPlatform(region),
                region
            }, urlOptions.query || {})
        };

        request(requestOptions, (error, response, body) => {
            if (error) {
                callback(error);
                return;
            }

            /**
             * Riot will respond with 429 when you go above the API KEY limit.
             * The `retry-after` will let you know when your next available
             * request will happen.
             */
            if (response.statusCode === 429) {
                const waitTime = Number(response.headers['retry-after']) * 1000;
                setTimeout(this._executeRequest.bind(this, urlOptions, userOptions, callback), waitTime);
                return;
            }

            if (response.statusCode !== 200) {
                callback({
                    code: body.status.status_code,
                    message: body.status.message
                });
                return;
            }

            callback(null, body);
        });
    }
});
