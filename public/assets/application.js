/*
 * Metadata - jQuery plugin for parsing metadata from elements
 *
 * Copyright (c) 2006 John Resig, Yehuda Katz, Jörn Zaefferer, Paul McLanahan
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Sets the type of metadata to use. Metadata is encoded in JSON, and each property
 * in the JSON will become a property of the element itself.
 *
 * There are three supported types of metadata storage:
 *
 *   attr:  Inside an attribute. The name parameter indicates *which* attribute.
 *
 *   class: Inside the class attribute, wrapped in curly braces: { }
 *
 *   elem:  Inside a child element (e.g. a script tag). The
 *          name parameter indicates *which* element.
 *
 * The metadata for an element is loaded the first time the element is accessed via jQuery.
 *
 * As a result, you can define the metadata type, use $(expr) to load the metadata into the elements
 * matched by expr, then redefine the metadata type and run another $(expr) for other elements.
 *
 * @name $.metadata.setType
 *
 * @example <p id="one" class="some_class {item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("class")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from the class attribute
 *
 * @example <p id="one" class="some_class" data="{item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("attr", "data")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a "data" attribute
 *
 * @example <p id="one" class="some_class"><script>{item_id: 1, item_label: 'Label'}</script>This is a p</p>
 * @before $.metadata.setType("elem", "script")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a nested script element
 *
 * @param String type The encoding type
 * @param String name The name of the attribute to be used to get metadata (optional)
 * @cat Plugins/Metadata
 * @descr Sets the type of encoding to be used when loading metadata for the first time
 * @type undefined
 * @see metadata()
 */


(function($) {

$.extend({
	metadata : {
		defaults : {
			type: 'class',
			name: 'metadata',
			cre: /(\{.*\})/,
			single: 'metadata'
		},
		setType: function( type, name ){
			this.defaults.type = type;
			this.defaults.name = name;
		},
		get: function( elem, opts ){
			var data, m, e, attr,
				settings = $.extend({},this.defaults,opts);
			// check for empty string in single property
			if ( !settings.single.length ) { settings.single = 'metadata'; }

			data = $.data(elem, settings.single);
			// returned cached data if it already exists
			if ( data ) { return data; }

			data = "{}";

			if ( settings.type === "class" ) {
				m = settings.cre.exec( elem.className );
				if ( m ) { data = m[1]; }
			} else if ( settings.type === "elem" ) {
				if( !elem.getElementsByTagName ) { return undefined; }
				e = elem.getElementsByTagName(settings.name);
				if ( e.length ) { data = $.trim(e[0].innerHTML); }
			} else if ( elem.getAttribute !== undefined ) {
				attr = elem.getAttribute( settings.name );
				if ( attr ) { data = attr; }
			}

			if ( data.indexOf( '{' ) <0 ) { data = "{" + data + "}"; }

			data = eval("(" + data + ")");

			$.data( elem, settings.single, data );
			return data;
		}
	}
});

/**
 * Returns the metadata object for the first member of the jQuery object.
 *
 * @name metadata
 * @descr Returns element's metadata object
 * @param Object opts An object contianing settings to override the defaults
 * @type jQuery
 * @cat Plugins/Metadata
 */
$.fn.metadata = function( opts ){
	return $.metadata.get( this[0], opts );
};

})(jQuery);
/*!
* TableSorter 2.7.5 - Client-side table sorting with ease!
* @requires jQuery v1.2.6+
*
* Copyright (c) 2007 Christian Bach
* Examples and docs at: http://tablesorter.com
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
* @type jQuery
* @name tablesorter
* @cat Plugins/Tablesorter
* @author Christian Bach/christian.bach@polyester.se
* @contributor Rob Garrison/https://github.com/Mottie/tablesorter
*/
/*jshint browser:true, jquery:true, unused:false, expr: true */
/*global console:false, alert:false */

!(function($) {
	"use strict";
	$.extend({
		/*jshint supernew:true */
		tablesorter: new function() {

			var ts = this;

			ts.version = "2.7.5";

			ts.parsers = [];
			ts.widgets = [];
			ts.defaults = {

				// *** appearance
				theme            : 'default',  // adds tablesorter-{theme} to the table for styling
				widthFixed       : false,      // adds colgroup to fix widths of columns
				showProcessing   : false,      // show an indeterminate timer icon in the header when the table is sorted or filtered.

				headerTemplate   : '{content}',// header layout template (HTML ok); {content} = innerHTML, {icon} = <i/> (class from cssIcon)
				onRenderTemplate : null,       // function(index, template){ return template; }, (template is a string)
				onRenderHeader   : null,       // function(index){}, (nothing to return)

				// *** functionality
				cancelSelection  : true,       // prevent text selection in the header
				dateFormat       : 'mmddyyyy', // other options: "ddmmyyy" or "yyyymmdd"
				sortMultiSortKey : 'shiftKey', // key used to select additional columns
				sortResetKey     : 'ctrlKey',  // key used to remove sorting on a column
				usNumberFormat   : true,       // false for German "1.234.567,89" or French "1 234 567,89"
				delayInit        : false,      // if false, the parsed table contents will not update until the first sort
				serverSideSorting: false,      // if true, server-side sorting should be performed because client-side sorting will be disabled, but the ui and events will still be used.

				// *** sort options
				headers          : {},         // set sorter, string, empty, locked order, sortInitialOrder, filter, etc.
				ignoreCase       : true,       // ignore case while sorting
				sortForce        : null,       // column(s) first sorted; always applied
				sortList         : [],         // Initial sort order; applied initially; updated when manually sorted
				sortAppend       : null,       // column(s) sorted last; always applied

				sortInitialOrder : 'asc',      // sort direction on first click
				sortLocaleCompare: false,      // replace equivalent character (accented characters)
				sortReset        : false,      // third click on the header will reset column to default - unsorted
				sortRestart      : false,      // restart sort to "sortInitialOrder" when clicking on previously unsorted columns

				emptyTo          : 'bottom',   // sort empty cell to bottom, top, none, zero
				stringTo         : 'max',      // sort strings in numerical column as max, min, top, bottom, zero
				textExtraction   : 'simple',   // text extraction method/function - function(node, table, cellIndex){}
				textSorter       : null,       // use custom text sorter - function(a,b){ return a.sort(b); } // basic sort

				// *** widget options
				widgets: [],                   // method to add widgets, e.g. widgets: ['zebra']
				widgetOptions    : {
					zebra : [ 'even', 'odd' ]    // zebra widget alternating row class names
				},
				initWidgets      : true,       // apply widgets on tablesorter initialization

				// *** callbacks
				initialized      : null,       // function(table){},

				// *** css class names
				tableClass       : 'tablesorter',
				cssAsc           : 'tablesorter-headerAsc',
				cssChildRow      : 'tablesorter-childRow', // previously "expand-child"
				cssDesc          : 'tablesorter-headerDesc',
				cssHeader        : 'tablesorter-header',
				cssHeaderRow     : 'tablesorter-headerRow',
				cssIcon          : 'tablesorter-icon', //  if this class exists, a <i> will be added to the header automatically
				cssInfoBlock     : 'tablesorter-infoOnly', // don't sort tbody with this class name
				cssProcessing    : 'tablesorter-processing', // processing icon applied to header during sort/filter

				// *** selectors
				selectorHeaders  : '> thead th, > thead td',
				selectorSort     : 'th, td',   // jQuery selector of content within selectorHeaders that is clickable to trigger a sort
				selectorRemove   : '.remove-me',

				// *** advanced
				debug            : false,

				// *** Internal variables
				headerList: [],
				empties: {},
				strings: {},
				parsers: []

				// deprecated; but retained for backwards compatibility
				// widgetZebra: { css: ["even", "odd"] }

			};

			/* debuging utils */
			function log(s) {
				if (typeof console !== "undefined" && typeof console.log !== "undefined") {
					console.log(s);
				} else {
					alert(s);
				}
			}

			function benchmark(s, d) {
				log(s + " (" + (new Date().getTime() - d.getTime()) + "ms)");
			}

			ts.benchmark = benchmark;

			function getElementText(table, node, cellIndex) {
				if (!node) { return ""; }
				var c = table.config,
					t = c.textExtraction, text = "";
				if (t === "simple") {
					if (c.supportsTextContent) {
						text = node.textContent; // newer browsers support this
					} else {
						text = $(node).text();
					}
				} else {
					if (typeof(t) === "function") {
						text = t(node, table, cellIndex);
					} else if (typeof(t) === "object" && t.hasOwnProperty(cellIndex)) {
						text = t[cellIndex](node, table, cellIndex);
					} else {
						text = c.supportsTextContent ? node.textContent : $(node).text();
					}
				}
				return $.trim(text);
			}

			function detectParserForColumn(table, rows, rowIndex, cellIndex) {
				var i, l = ts.parsers.length,
				node = false,
				nodeValue = '',
				keepLooking = true;
				while (nodeValue === '' && keepLooking) {
					rowIndex++;
					if (rows[rowIndex]) {
						node = rows[rowIndex].cells[cellIndex];
						nodeValue = getElementText(table, node, cellIndex);
						if (table.config.debug) {
							log('Checking if value was empty on row ' + rowIndex + ', column: ' + cellIndex + ': ' + nodeValue);
						}
					} else {
						keepLooking = false;
					}
				}
				for (i = 1; i < l; i++) {
					if (ts.parsers[i].is && ts.parsers[i].is(nodeValue, table, node)) {
						return ts.parsers[i];
					}
				}
				// 0 is always the generic parser (text)
				return ts.parsers[0];
			}

			function buildParserCache(table) {
				var c = table.config,
					// update table bodies in case we start with an empty table
					tb = c.$tbodies = c.$table.children('tbody:not(.' + c.cssInfoBlock + ')'),
					rows, list, l, i, h, ch, p, parsersDebug = "";
				if ( tb.length === 0) {
					return c.debug ? log('*Empty table!* Not building a parser cache') : '';
				}
				rows = tb[0].rows;
				if (rows[0]) {
					list = [];
					l = rows[0].cells.length;
					for (i = 0; i < l; i++) {
						// tons of thanks to AnthonyM1229 for working out the following selector (issue #74) to make this work in IE8!
						// More fixes to this selector to work properly in iOS and jQuery 1.8+ (issue #132 & #174)
						h = c.$headers.filter(':not([colspan])');
						h = h.add( c.$headers.filter('[colspan="1"]') ) // ie8 fix
							.filter('[data-column="' + i + '"]:last');
						ch = c.headers[i];
						// get column parser
						p = ts.getParserById( ts.getData(h, ch, 'sorter') );
						// empty cells behaviour - keeping emptyToBottom for backwards compatibility
						c.empties[i] = ts.getData(h, ch, 'empty') || c.emptyTo || (c.emptyToBottom ? 'bottom' : 'top' );
						// text strings behaviour in numerical sorts
						c.strings[i] = ts.getData(h, ch, 'string') || c.stringTo || 'max';
						if (!p) {
							p = detectParserForColumn(table, rows, -1, i);
						}
						if (c.debug) {
							parsersDebug += "column:" + i + "; parser:" + p.id + "; string:" + c.strings[i] + '; empty: ' + c.empties[i] + "\n";
						}
						list.push(p);
					}
				}
				if (c.debug) {
					log(parsersDebug);
				}
				return list;
			}

			/* utils */
			function buildCache(table) {
				var b = table.tBodies,
				tc = table.config,
				totalRows,
				totalCells,
				parsers = tc.parsers,
				t, v, i, j, k, c, cols, cacheTime, colMax = [];
				tc.cache = {};
				// if no parsers found, return - it's an empty table.
				if (!parsers) {
					return tc.debug ? log('*Empty table!* Not building a cache') : '';
				}
				if (tc.debug) {
					cacheTime = new Date();
				}
				// processing icon
				if (tc.showProcessing) {
					ts.isProcessing(table, true);
				}
				for (k = 0; k < b.length; k++) {
					tc.cache[k] = { row: [], normalized: [] };
					// ignore tbodies with class name from css.cssInfoBlock
					if (!$(b[k]).hasClass(tc.cssInfoBlock)) {
						totalRows = (b[k] && b[k].rows.length) || 0;
						totalCells = (b[k].rows[0] && b[k].rows[0].cells.length) || 0;
						for (i = 0; i < totalRows; ++i) {
							/** Add the table data to main data array */
							c = $(b[k].rows[i]);
							cols = [];
							// if this is a child row, add it to the last row's children and continue to the next row
							if (c.hasClass(tc.cssChildRow)) {
								tc.cache[k].row[tc.cache[k].row.length - 1] = tc.cache[k].row[tc.cache[k].row.length - 1].add(c);
								// go to the next for loop
								continue;
							}
							tc.cache[k].row.push(c);
							for (j = 0; j < totalCells; ++j) {
								t = getElementText(table, c[0].cells[j], j);
								// allow parsing if the string is empty, previously parsing would change it to zero,
								// in case the parser needs to extract data from the table cell attributes
								v = parsers[j].format(t, table, c[0].cells[j], j);
								cols.push(v);
								if ((parsers[j].type || '').toLowerCase() === "numeric") {
									colMax[j] = Math.max(Math.abs(v), colMax[j] || 0); // determine column max value (ignore sign)
								}
							}
							cols.push(tc.cache[k].normalized.length); // add position for rowCache
							tc.cache[k].normalized.push(cols);
						}
						tc.cache[k].colMax = colMax;
					}
				}
				if (tc.showProcessing) {
					ts.isProcessing(table); // remove processing icon
				}
				if (tc.debug) {
					benchmark("Building cache for " + totalRows + " rows", cacheTime);
				}
			}

			// init flag (true) used by pager plugin to prevent widget application
			function appendToTable(table, init) {
				var c = table.config,
				b = table.tBodies,
				rows = [],
				c2 = c.cache,
				r, n, totalRows, checkCell, $bk, $tb,
				i, j, k, l, pos, appendTime;
				if (!c2[0]) { return; } // empty table - fixes #206
				if (c.debug) {
					appendTime = new Date();
				}
				for (k = 0; k < b.length; k++) {
					$bk = $(b[k]);
					if (!$bk.hasClass(c.cssInfoBlock)) {
						// get tbody
						$tb = ts.processTbody(table, $bk, true);
						r = c2[k].row;
						n = c2[k].normalized;
						totalRows = n.length;
						checkCell = totalRows ? (n[0].length - 1) : 0;
						for (i = 0; i < totalRows; i++) {
							pos = n[i][checkCell];
							rows.push(r[pos]);
							// removeRows used by the pager plugin
							if (!c.appender || !c.removeRows) {
								l = r[pos].length;
								for (j = 0; j < l; j++) {
									$tb.append(r[pos][j]);
								}
							}
						}
						// restore tbody
						ts.processTbody(table, $tb, false);
					}
				}
				if (c.appender) {
					c.appender(table, rows);
				}
				if (c.debug) {
					benchmark("Rebuilt table", appendTime);
				}
				// apply table widgets
				if (!init) { ts.applyWidget(table); }
				// trigger sortend
				$(table).trigger("sortEnd", table);
			}

			// computeTableHeaderCellIndexes from:
			// http://www.javascripttoolbox.com/lib/table/examples.php
			// http://www.javascripttoolbox.com/temp/table_cellindex.html
			function computeThIndexes(t) {
				var matrix = [],
				lookup = {},
				cols = 0, // determine the number of columns
				trs = $(t).find('thead:eq(0), tfoot').children('tr'), // children tr in tfoot - see issue #196
				i, j, k, l, c, cells, rowIndex, cellId, rowSpan, colSpan, firstAvailCol, matrixrow;
				for (i = 0; i < trs.length; i++) {
					cells = trs[i].cells;
					for (j = 0; j < cells.length; j++) {
						c = cells[j];
						rowIndex = c.parentNode.rowIndex;
						cellId = rowIndex + "-" + c.cellIndex;
						rowSpan = c.rowSpan || 1;
						colSpan = c.colSpan || 1;
						if (typeof(matrix[rowIndex]) === "undefined") {
							matrix[rowIndex] = [];
						}
						// Find first available column in the first row
						for (k = 0; k < matrix[rowIndex].length + 1; k++) {
							if (typeof(matrix[rowIndex][k]) === "undefined") {
								firstAvailCol = k;
								break;
							}
						}
						lookup[cellId] = firstAvailCol;
						cols = Math.max(firstAvailCol, cols);
						// add data-column
						$(c).attr({ 'data-column' : firstAvailCol }); // 'data-row' : rowIndex
						for (k = rowIndex; k < rowIndex + rowSpan; k++) {
							if (typeof(matrix[k]) === "undefined") {
								matrix[k] = [];
							}
							matrixrow = matrix[k];
							for (l = firstAvailCol; l < firstAvailCol + colSpan; l++) {
								matrixrow[l] = "x";
							}
						}
					}
				}
				t.config.columns = cols; // may not be accurate if # header columns !== # tbody columns
				return lookup;
			}

			function formatSortingOrder(v) {
				// look for "d" in "desc" order; return true
				return (/^d/i.test(v) || v === 1);
			}

			function buildHeaders(table) {
				var header_index = computeThIndexes(table), ch, $t,
					h, i, t, lock, time, $tableHeaders, c = table.config;
					c.headerList = [], c.headerContent = [];
				if (c.debug) {
					time = new Date();
				}
				i = c.cssIcon ? '<i class="' + c.cssIcon + '"></i>' : ''; // add icon if cssIcon option exists
				$tableHeaders = $(table).find(c.selectorHeaders).each(function(index) {
					$t = $(this);
					ch = c.headers[index];
					c.headerContent[index] = this.innerHTML; // save original header content
					// set up header template
					t = c.headerTemplate.replace(/\{content\}/g, this.innerHTML).replace(/\{icon\}/g, i);
					if (c.onRenderTemplate) {
						h = c.onRenderTemplate.apply($t, [index, t]);
						if (h && typeof h === 'string') { t = h; } // only change t if something is returned
					}
					this.innerHTML = '<div class="tablesorter-header-inner">' + t + '</div>'; // faster than wrapInner

					if (c.onRenderHeader) { c.onRenderHeader.apply($t, [index]); }

					this.column = header_index[this.parentNode.rowIndex + "-" + this.cellIndex];
					this.order = formatSortingOrder( ts.getData($t, ch, 'sortInitialOrder') || c.sortInitialOrder ) ? [1,0,2] : [0,1,2];
					this.count = -1; // set to -1 because clicking on the header automatically adds one
					if (ts.getData($t, ch, 'sorter') === 'false') {
						this.sortDisabled = true;
						$t.addClass('sorter-false');
					} else {
						$t.removeClass('sorter-false');
					}
					this.lockedOrder = false;
					lock = ts.getData($t, ch, 'lockedOrder') || false;
					if (typeof(lock) !== 'undefined' && lock !== false) {
						this.order = this.lockedOrder = formatSortingOrder(lock) ? [1,1,1] : [0,0,0];
					}
					$t.addClass( (this.sortDisabled ? 'sorter-false ' : ' ') + c.cssHeader );
					// add cell to headerList
					c.headerList[index] = this;
					// add to parent in case there are multiple rows
					$t.parent().addClass(c.cssHeaderRow);
				});
				if (table.config.debug) {
					benchmark("Built headers:", time);
					log($tableHeaders);
				}
				return $tableHeaders;
			}

			function setHeadersCss(table) {
				var f, i, j, l,
					c = table.config,
					list = c.sortList,
					css = [c.cssAsc, c.cssDesc],
					// find the footer
					$t = $(table).find('tfoot tr').children().removeClass(css.join(' '));
				// remove all header information
				c.$headers.removeClass(css.join(' '));
				l = list.length;
				for (i = 0; i < l; i++) {
					// direction = 2 means reset!
					if (list[i][1] !== 2) {
						// multicolumn sorting updating - choose the :last in case there are nested columns
						f = c.$headers.not('.sorter-false').filter('[data-column="' + list[i][0] + '"]' + (l === 1 ? ':last' : '') );
						if (f.length) {
							for (j = 0; j < f.length; j++) {
								if (!f[j].sortDisabled) {
									f.eq(j).addClass(css[list[i][1]]);
									// add sorted class to footer, if it exists
									if ($t.length) {
										$t.filter('[data-column="' + list[i][0] + '"]').eq(j).addClass(css[list[i][1]]);
									}
								}
							}
						}
					}
				}
			}

			// automatically add col group, and column sizes if set
			function fixColumnWidth(table) {
				var $c, c = table.config,
					$cg = $('<colgroup>'),
					$cgo = c.$table.find('colgroup'),
					n = c.columns.length,
					overallWidth = c.$table.width();
				$("tr:first td", table.tBodies[0]).each(function(i) {
					$c = $('<col>');
					if (c.widthFixed) {
						$c.css('width', parseInt(($(this).width()/overallWidth)*1000, 10)/10 + '%');
					}
					$cg.append($c);
				});
				// replace colgroup contents
				if ($cgo.length) {
					$cgo.html( $cg.html() );
				} else {
					c.$table.prepend( $cg );
				}
			}

			function updateHeaderSortCount(table, list) {
				var s, t, o, c = table.config,
					sl = list || c.sortList;
				c.sortList = [];
				$.each(sl, function(i,v){
					// ensure all sortList values are numeric - fixes #127
					s = [ parseInt(v[0], 10), parseInt(v[1], 10) ];
					// make sure header exists
					o = c.headerList[s[0]];
					if (o) { // prevents error if sorton array is wrong
						c.sortList.push(s);
						t = $.inArray(s[1], o.order); // fixes issue #167
						o.count = t >= 0 ? t : s[1] % (c.sortReset ? 3 : 2);
					}
				});
			}

			function getCachedSortType(parsers, i) {
				return (parsers && parsers[i]) ? parsers[i].type || '' : '';
			}

			// sort multiple columns
			function multisort(table) { /*jshint loopfunc:true */
				var dynamicExp, sortWrapper, col, mx = 0, dir = 0, tc = table.config,
				sortList = tc.sortList, l = sortList.length, bl = table.tBodies.length,
				sortTime, i, j, k, c, colMax, cache, lc, s, e, order, orgOrderCol;
				if (tc.serverSideSorting || !tc.cache[0]) { // empty table - fixes #206
					return;
				}
				if (tc.debug) { sortTime = new Date(); }
				for (k = 0; k < bl; k++) {
					colMax = tc.cache[k].colMax;
					cache = tc.cache[k].normalized;
					lc = cache.length;
					orgOrderCol = (cache && cache[0]) ? cache[0].length - 1 : 0;
					cache.sort(function(a, b) {
						// cache is undefined here in IE, so don't use it!
						for (i = 0; i < l; i++) {
							c = sortList[i][0];
							order = sortList[i][1];
							// fallback to natural sort since it is more robust
							s = /n/i.test(getCachedSortType(tc.parsers, c)) ? "Numeric" : "Text";
							s += order === 0 ? "" : "Desc";
							if (/Numeric/.test(s) && tc.strings[c]) {
								// sort strings in numerical columns
								if (typeof (tc.string[tc.strings[c]]) === 'boolean') {
									dir = (order === 0 ? 1 : -1) * (tc.string[tc.strings[c]] ? -1 : 1);
								} else {
									dir = (tc.strings[c]) ? tc.string[tc.strings[c]] || 0 : 0;
								}
							}
							var sort = $.tablesorter["sort" + s](table, a[c], b[c], c, colMax[c], dir);
							if (sort) { return sort; }
						}
						return a[orgOrderCol] - b[orgOrderCol];
					});
				}
				if (tc.debug) { benchmark("Sorting on " + sortList.toString() + " and dir " + order + " time", sortTime); }
			}

			function resortComplete($table, callback){
				$table.trigger('updateComplete');
				if (typeof callback === "function") {
					callback($table[0]);
				}
			}

			function checkResort($table, flag, callback) {
				if (flag !== false) {
					$table.trigger("sorton", [$table[0].config.sortList, function(){
						resortComplete($table, callback);
					}]);
				} else {
					resortComplete($table, callback);
				}
			}

			/* public methods */
			ts.construct = function(settings) {
				return this.each(function() {
					// if no thead or tbody, or tablesorter is already present, quit
					if (!this.tHead || this.tBodies.length === 0 || this.hasInitialized === true) {
						return (this.config.debug) ? log('stopping initialization! No thead, tbody or tablesorter has already been initialized') : '';
					}
					// declare
					var $cell, $this = $(this), $t0 = this,
						c, i, j, k = '', a, s, o, downTime,
						m = $.metadata;
					// initialization flag
					$t0.hasInitialized = false;
					// new blank config object
					$t0.config = {};
					// merge and extend
					c = $.extend(true, $t0.config, ts.defaults, settings);
					// save the settings where they read
					$.data($t0, "tablesorter", c);
					if (c.debug) { $.data( $t0, 'startoveralltimer', new Date()); }
					// constants
					c.supportsTextContent = $('<span>x</span>')[0].textContent === 'x';
					c.supportsDataObject = parseFloat($.fn.jquery) >= 1.4;
					// digit sort text location; keeping max+/- for backwards compatibility
					c.string = { 'max': 1, 'min': -1, 'max+': 1, 'max-': -1, 'zero': 0, 'none': 0, 'null': 0, 'top': true, 'bottom': false };
					// add table theme class only if there isn't already one there
					if (!/tablesorter\-/.test($this.attr('class'))) {
						k = (c.theme !== '' ? ' tablesorter-' + c.theme : '');
					}
					c.$table = $this.addClass(c.tableClass + k);
					c.$tbodies = $this.children('tbody:not(.' + c.cssInfoBlock + ')');
					// build headers
					c.$headers = buildHeaders($t0);
					// fixate columns if the users supplies the fixedWidth option
					// do this after theme has been applied
					fixColumnWidth($t0);
					// try to auto detect column type, and store in tables config
					c.parsers = buildParserCache($t0);
					// build the cache for the tbody cells
					// delayInit will delay building the cache until the user starts a sort
					if (!c.delayInit) { buildCache($t0); }
					// apply event handling to headers
					// this is to big, perhaps break it out?
					c.$headers
					// http://stackoverflow.com/questions/5312849/jquery-find-self
					.find('*').andSelf().filter(c.selectorSort)
					.unbind('mousedown.tablesorter mouseup.tablesorter')
					.bind('mousedown.tablesorter mouseup.tablesorter', function(e, external) {
						// jQuery v1.2.6 doesn't have closest()
						var $cell = this.tagName.match('TH|TD') ? $(this) : $(this).parents('th, td').filter(':last'), cell = $cell[0];
						// only recognize left clicks
						if ((e.which || e.button) !== 1) { return false; }
						// set timer on mousedown
						if (e.type === 'mousedown') {
							downTime = new Date().getTime();
							return e.target.tagName === "INPUT" ? '' : !c.cancelSelection;
						}
						// ignore long clicks (prevents resizable widget from initializing a sort)
						if (external !== true && (new Date().getTime() - downTime > 250)) { return false; }
						if (c.delayInit && !c.cache) { buildCache($t0); }
						if (!cell.sortDisabled) {
							// Only call sortStart if sorting is enabled
							$this.trigger("sortStart", $t0);
							// store exp, for speed
							// $cell = $(this);
							k = !e[c.sortMultiSortKey];
							// get current column sort order
							cell.count = e[c.sortResetKey] ? 2 : (cell.count + 1) % (c.sortReset ? 3 : 2);
							// reset all sorts on non-current column - issue #30
							if (c.sortRestart) {
								i = cell;
								c.$headers.each(function() {
									// only reset counts on columns that weren't just clicked on and if not included in a multisort
									if (this !== i && (k || !$(this).is('.' + c.cssDesc + ',.' + c.cssAsc))) {
										this.count = -1;
									}
								});
							}
							// get current column index
							i = cell.column;
							// user only wants to sort on one column
							if (k) {
								// flush the sort list
								c.sortList = [];
								if (c.sortForce !== null) {
									a = c.sortForce;
									for (j = 0; j < a.length; j++) {
										if (a[j][0] !== i) {
											c.sortList.push(a[j]);
										}
									}
								}
								// add column to sort list
								o = cell.order[cell.count];
								if (o < 2) {
									c.sortList.push([i, o]);
									// add other columns if header spans across multiple
									if (cell.colSpan > 1) {
										for (j = 1; j < cell.colSpan; j++) {
											c.sortList.push([i + j, o]);
										}
									}
								}
								// multi column sorting
							} else {
								// get rid of the sortAppend before adding more - fixes issue #115
								if (c.sortAppend && c.sortList.length > 1) {
									if (ts.isValueInArray(c.sortAppend[0][0], c.sortList)) {
										c.sortList.pop();
									}
								}
								// the user has clicked on an already sorted column
								if (ts.isValueInArray(i, c.sortList)) {
									// reverse the sorting direction for all tables
									for (j = 0; j < c.sortList.length; j++) {
										s = c.sortList[j];
										o = c.headerList[s[0]];
										if (s[0] === i) {
											s[1] = o.order[o.count];
											if (s[1] === 2) {
												c.sortList.splice(j,1);
												o.count = -1;
											}
										}
									}
								} else {
									// add column to sort list array
									o = cell.order[cell.count];
									if (o < 2) {
										c.sortList.push([i, o]);
										// add other columns if header spans across multiple
										if (cell.colSpan > 1) {
											for (j = 1; j < cell.colSpan; j++) {
												c.sortList.push([i + j, o]);
											}
										}
									}
								}
							}
							if (c.sortAppend !== null) {
								a = c.sortAppend;
								for (j = 0; j < a.length; j++) {
									if (a[j][0] !== i) {
										c.sortList.push(a[j]);
									}
								}
							}
							// sortBegin event triggered immediately before the sort
							$this.trigger("sortBegin", $t0);
							// setTimeout needed so the processing icon shows up
							setTimeout(function(){
								// set css for headers
								setHeadersCss($t0);
								multisort($t0);
								appendToTable($t0);
							}, 1);
						}
					});
					if (c.cancelSelection) {
						// cancel selection
						c.$headers.each(function() {
							this.onselectstart = function() {
								return false;
							};
						});
					}
					// apply easy methods that trigger binded events
					$this
					.unbind('sortReset update updateCell addRows sorton appendCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave')
					.bind("sortReset", function(){
						c.sortList = [];
						setHeadersCss($t0);
						multisort($t0);
						appendToTable($t0);
					})
					.bind("update updateRows", function(e, resort, callback) {
						// remove rows/elements before update
						$(c.selectorRemove, $t0).remove();
						// rebuild parsers
						c.parsers = buildParserCache($t0);
						// rebuild the cache map
						buildCache($t0);
						checkResort($this, resort, callback);
					})
					.bind("updateCell", function(e, cell, resort, callback) {
						// get position from the dom
						var l, row, icell,
						$tb = $this.find('tbody'),
						// update cache - format: function(s, table, cell, cellIndex)
						// no closest in jQuery v1.2.6 - tbdy = $tb.index( $(cell).closest('tbody') ),$row = $(cell).closest('tr');
						tbdy = $tb.index( $(cell).parents('tbody').filter(':last') ),
						$row = $(cell).parents('tr').filter(':last');
						cell = $(cell)[0]; // in case cell is a jQuery object
						// tbody may not exist if update is initialized while tbody is removed for processing
						if ($tb.length && tbdy >= 0) {
							row = $tb.eq(tbdy).find('tr').index( $row );
							icell = cell.cellIndex;
							l = $t0.config.cache[tbdy].normalized[row].length - 1;
							$t0.config.cache[tbdy].row[$t0.config.cache[tbdy].normalized[row][l]] = $row;
							$t0.config.cache[tbdy].normalized[row][icell] = c.parsers[icell].format( getElementText($t0, cell, icell), $t0, cell, icell );
							checkResort($this, resort, callback);
						}
					})
					.bind("addRows", function(e, $row, resort, callback) {
						var i, rows = $row.filter('tr').length,
						dat = [], l = $row[0].cells.length,
						tbdy = $this.find('tbody').index( $row.closest('tbody') );
						// fixes adding rows to an empty table - see issue #179
						if (!c.parsers) {
							c.parsers = buildParserCache($t0);
						}
						// add each row
						for (i = 0; i < rows; i++) {
							// add each cell
							for (j = 0; j < l; j++) {
								dat[j] = c.parsers[j].format( getElementText($t0, $row[i].cells[j], j), $t0, $row[i].cells[j], j );
							}
							// add the row index to the end
							dat.push(c.cache[tbdy].row.length);
							// update cache
							c.cache[tbdy].row.push([$row[i]]);
							c.cache[tbdy].normalized.push(dat);
							dat = [];
						}
						// resort using current settings
						checkResort($this, resort, callback);
					})
					.bind("sorton", function(e, list, callback, init) {
						$this.trigger("sortStart", this);
						// update header count index
						updateHeaderSortCount($t0, list);
						// set css for headers
						setHeadersCss($t0);
						// sort the table and append it to the dom
						multisort($t0);
						appendToTable($t0, init);
						if (typeof callback === "function") {
							callback($t0);
						}
					})
					.bind("appendCache", function(e, callback, init) {
						appendToTable($t0, init);
						if (typeof callback === "function") {
							callback($t0);
						}
					})
					.bind("applyWidgetId", function(e, id) {
						ts.getWidgetById(id).format($t0, c, c.widgetOptions);
					})
					.bind("applyWidgets", function(e, init) {
						// apply widgets
						ts.applyWidget($t0, init);
					})
					.bind("refreshWidgets", function(e, all, dontapply){
						ts.refreshWidgets($t0, all, dontapply);
					})
					.bind("destroy", function(e, c, cb){
						ts.destroy($t0, c, cb);
					});

					// get sort list from jQuery data or metadata
					// in jQuery < 1.4, an error occurs when calling $this.data()
					if (c.supportsDataObject && typeof $this.data().sortlist !== 'undefined') {
						c.sortList = $this.data().sortlist;
					} else if (m && ($this.metadata() && $this.metadata().sortlist)) {
						c.sortList = $this.metadata().sortlist;
					}
					// apply widget init code
					ts.applyWidget($t0, true);
					// if user has supplied a sort list to constructor
					if (c.sortList.length > 0) {
						$this.trigger("sorton", [c.sortList, {}, !c.initWidgets]);
					} else if (c.initWidgets) {
						// apply widget format
						ts.applyWidget($t0);
					}

					// show processesing icon
					if (c.showProcessing) {
						$this
						.unbind('sortBegin sortEnd')
						.bind('sortBegin sortEnd', function(e) {
							ts.isProcessing($t0, e.type === 'sortBegin');
						});
					}

					// initialized
					$t0.hasInitialized = true;
					if (c.debug) {
						ts.benchmark("Overall initialization time", $.data( $t0, 'startoveralltimer'));
					}
					$this.trigger('tablesorter-initialized', $t0);
					if (typeof c.initialized === 'function') { c.initialized($t0); }
				});
			};

			// *** Process table ***
			// add processing indicator
			ts.isProcessing = function(table, toggle, $ths) {
				var c = table.config,
					// default to all headers
					$h = $ths || $(table).find('.' + c.cssHeader);
				if (toggle) {
					if (c.sortList.length > 0) {
						// get headers from the sortList
						$h = $h.filter(function(){
							// get data-column from attr to keep  compatibility with jQuery 1.2.6
							return this.sortDisabled ? false : ts.isValueInArray( parseFloat($(this).attr('data-column')), c.sortList);
						});
					}
					$h.addClass(c.cssProcessing);
				} else {
					$h.removeClass(c.cssProcessing);
				}
			};

			// detach tbody but save the position
			// don't use tbody because there are portions that look for a tbody index (updateCell)
			ts.processTbody = function(table, $tb, getIt){
				var t, holdr;
				if (getIt) {
					$tb.before('<span class="tablesorter-savemyplace"/>');
					holdr = ($.fn.detach) ? $tb.detach() : $tb.remove();
					return holdr;
				}
				holdr = $(table).find('span.tablesorter-savemyplace');
				$tb.insertAfter( holdr );
				holdr.remove();
			};

			ts.clearTableBody = function(table) {
				table.config.$tbodies.empty();
			};

			ts.destroy = function(table, removeClasses, callback){
				if (!table.hasInitialized) { return; }
				// remove all widgets
				ts.refreshWidgets(table, true, true);
				var $t = $(table), c = table.config,
				$h = $t.find('thead:first'),
				$r = $h.find('tr.' + c.cssHeaderRow).removeClass(c.cssHeaderRow),
				$f = $t.find('tfoot:first > tr').children('th, td');
				// remove widget added rows, just in case
				$h.find('tr').not($r).remove();
				// disable tablesorter
				$t
					.removeData('tablesorter')
					.unbind('sortReset update updateCell addRows sorton appendCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave');
				c.$headers.add($f)
					.removeClass(c.cssHeader + ' ' + c.cssAsc + ' ' + c.cssDesc)
					.removeAttr('data-column');
				$r.find(c.selectorSort).unbind('mousedown.tablesorter mouseup.tablesorter');
				// restore headers
				$r.children().each(function(i){
					$(this).html( c.headerContent[i] );
				});
				if (removeClasses !== false) {
					$t.removeClass(c.tableClass + ' tablesorter-' + c.theme);
				}
				// clear flag in case the plugin is initialized again
				table.hasInitialized = false;
				if (typeof callback === 'function') {
					callback(table);
				}
			};

			// *** sort functions ***
			// regex used in natural sort
			ts.regex = [
				/(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi, // chunk/tokenize numbers & letters
				/(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/, //date
				/^0x[0-9a-f]+$/i // hex
			];

			// Natural sort - https://github.com/overset/javascript-natural-sort
			ts.sortText = function(table, a, b, col) {
				if (a === b) { return 0; }
				var c = table.config, e = c.string[ (c.empties[col] || c.emptyTo ) ],
					r = ts.regex, xN, xD, yN, yD, xF, yF, i, mx;
				if (a === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? -1 : 1) : -e || -1; }
				if (b === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? 1 : -1) : e || 1; }
				if (typeof c.textSorter === 'function') { return c.textSorter(a, b, table, col); }
				// chunk/tokenize
				xN = a.replace(r[0], '\\0$1\\0').replace(/\\0$/, '').replace(/^\\0/, '').split('\\0');
				yN = b.replace(r[0], '\\0$1\\0').replace(/\\0$/, '').replace(/^\\0/, '').split('\\0');
				// numeric, hex or date detection
				xD = parseInt(a.match(r[2]),16) || (xN.length !== 1 && a.match(r[1]) && Date.parse(a));
				yD = parseInt(b.match(r[2]),16) || (xD && b.match(r[1]) && Date.parse(b)) || null;
				// first try and sort Hex codes or Dates
				if (yD) {
					if ( xD < yD ) { return -1; }
					if ( xD > yD ) { return 1; }
				}
				mx = Math.max(xN.length, yN.length);
				// natural sorting through split numeric strings and default strings
				for (i = 0; i < mx; i++) {
					// find floats not starting with '0', string or 0 if not defined
					xF = isNaN(xN[i]) ? xN[i] || 0 : parseFloat(xN[i]) || 0;
					yF = isNaN(yN[i]) ? yN[i] || 0 : parseFloat(yN[i]) || 0;
					// handle numeric vs string comparison - number < string - (Kyle Adams)
					if (isNaN(xF) !== isNaN(yF)) { return (isNaN(xF)) ? 1 : -1; }
					// rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
					if (typeof xF !== typeof yF) {
						xF += '';
						yF += '';
					}
					if (xF < yF) { return -1; }
					if (xF > yF) { return 1; }
				}
				return 0;
			};

			ts.sortTextDesc = function(table, a, b, col) {
				if (a === b) { return 0; }
				var c = table.config, e = c.string[ (c.empties[col] || c.emptyTo ) ];
				if (a === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? -1 : 1) : e || 1; }
				if (b === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? 1 : -1) : -e || -1; }
				if (typeof c.textSorter === 'function') { return c.textSorter(b, a, table, col); }
				return ts.sortText(table, b, a);
			};

			// return text string value by adding up ascii value
			// so the text is somewhat sorted when using a digital sort
			// this is NOT an alphanumeric sort
			ts.getTextValue = function(a, mx, d) {
				if (mx) {
					// make sure the text value is greater than the max numerical value (mx)
					var i, l = a.length, n = mx + d;
					for (i = 0; i < l; i++) {
						n += a.charCodeAt(i);
					}
					return d * n;
				}
				return 0;
			};

			ts.sortNumeric = function(table, a, b, col, mx, d) {
				if (a === b) { return 0; }
				var c = table.config, e = c.string[ (c.empties[col] || c.emptyTo ) ];
				if (a === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? -1 : 1) : -e || -1; }
				if (b === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? 1 : -1) : e || 1; }
				if (isNaN(a)) { a = ts.getTextValue(a, mx, d); }
				if (isNaN(b)) { b = ts.getTextValue(b, mx, d); }
				return a - b;
			};

			ts.sortNumericDesc = function(table, a, b, col, mx, d) {
				if (a === b) { return 0; }
				var c = table.config, e = c.string[ (c.empties[col] || c.emptyTo ) ];
				if (a === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? -1 : 1) : e || 1; }
				if (b === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? 1 : -1) : -e || -1; }
				if (isNaN(a)) { a = ts.getTextValue(a, mx, d); }
				if (isNaN(b)) { b = ts.getTextValue(b, mx, d); }
				return b - a;
			};

			// used when replacing accented characters during sorting
			ts.characterEquivalents = {
				"a" : "\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5", // áàâãäąå
				"A" : "\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5", // ÁÀÂÃÄĄÅ
				"c" : "\u00e7\u0107\u010d", // çćč
				"C" : "\u00c7\u0106\u010c", // ÇĆČ
				"e" : "\u00e9\u00e8\u00ea\u00eb\u011b\u0119", // éèêëěę
				"E" : "\u00c9\u00c8\u00ca\u00cb\u011a\u0118", // ÉÈÊËĚĘ
				"i" : "\u00ed\u00ec\u0130\u00ee\u00ef\u0131", // íìİîïı
				"I" : "\u00cd\u00cc\u0130\u00ce\u00cf", // ÍÌİÎÏ
				"o" : "\u00f3\u00f2\u00f4\u00f5\u00f6", // óòôõö
				"O" : "\u00d3\u00d2\u00d4\u00d5\u00d6", // ÓÒÔÕÖ
				"ss": "\u00df", // ß (s sharp)
				"SS": "\u1e9e", // ẞ (Capital sharp s)
				"u" : "\u00fa\u00f9\u00fb\u00fc\u016f", // úùûüů
				"U" : "\u00da\u00d9\u00db\u00dc\u016e" // ÚÙÛÜŮ
			};
			ts.replaceAccents = function(s) {
				var a, acc = '[', eq = ts.characterEquivalents;
				if (!ts.characterRegex) {
					ts.characterRegexArray = {};
					for (a in eq) {
						if (typeof a === 'string') {
							acc += eq[a];
							ts.characterRegexArray[a] = new RegExp('[' + eq[a] + ']', 'g');
						}
					}
					ts.characterRegex = new RegExp(acc + ']');
				}
				if (ts.characterRegex.test(s)) {
					for (a in eq) {
						if (typeof a === 'string') {
							s = s.replace( ts.characterRegexArray[a], a );
						}
					}
				}
				return s;
			};

			// *** utilities ***
			ts.isValueInArray = function(v, a) {
				var i, l = a.length;
				for (i = 0; i < l; i++) {
					if (a[i][0] === v) {
						return true;
					}
				}
				return false;
			};

			ts.addParser = function(parser) {
				var i, l = ts.parsers.length, a = true;
				for (i = 0; i < l; i++) {
					if (ts.parsers[i].id.toLowerCase() === parser.id.toLowerCase()) {
						a = false;
					}
				}
				if (a) {
					ts.parsers.push(parser);
				}
			};

			ts.getParserById = function(name) {
				var i, l = ts.parsers.length;
				for (i = 0; i < l; i++) {
					if (ts.parsers[i].id.toLowerCase() === (name.toString()).toLowerCase()) {
						return ts.parsers[i];
					}
				}
				return false;
			};

			ts.addWidget = function(widget) {
				ts.widgets.push(widget);
			};

			ts.getWidgetById = function(name) {
				var i, w, l = ts.widgets.length;
				for (i = 0; i < l; i++) {
					w = ts.widgets[i];
					if (w && w.hasOwnProperty('id') && w.id.toLowerCase() === name.toLowerCase()) {
						return w;
					}
				}
			};

			ts.applyWidget = function(table, init) {
				var c = table.config,
					wo = c.widgetOptions,
					ws = c.widgets.sort().reverse(), // ensure that widgets are always applied in a certain order
					time, i, w, l = ws.length;
				// make zebra last
				i = $.inArray('zebra', c.widgets);
				if (i >= 0) {
					c.widgets.splice(i,1);
					c.widgets.push('zebra');
				}
				if (c.debug) {
					time = new Date();
				}
				// add selected widgets
				for (i = 0; i < l; i++) {
					w = ts.getWidgetById(ws[i]);
					if ( w ) {
						if (init === true && w.hasOwnProperty('init')) {
							w.init(table, w, c, wo);
						} else if (!init && w.hasOwnProperty('format')) {
							w.format(table, c, wo);
						}
					}
				}
				if (c.debug) {
					benchmark("Completed " + (init === true ? "initializing" : "applying") + " widgets", time);
				}
			};

			ts.refreshWidgets = function(table, doAll, dontapply) {
				var i, c = table.config,
					cw = c.widgets,
					w = ts.widgets, l = w.length;
				// remove previous widgets
				for (i = 0; i < l; i++){
					if ( w[i] && w[i].id && (doAll || $.inArray( w[i].id, cw ) < 0) ) {
						if (c.debug) { log( 'Refeshing widgets: Removing ' + w[i].id  ); }
						if (w[i].hasOwnProperty('remove')) { w[i].remove(table, c, c.widgetOptions); }
					}
				}
				if (dontapply !== true) {
					ts.applyWidget(table, doAll);
				}
			};

			// get sorter, string, empty, etc options for each column from
			// jQuery data, metadata, header option or header class name ("sorter-false")
			// priority = jQuery data > meta > headers option > header class name
			ts.getData = function(h, ch, key) {
				var val = '', $h = $(h), m, cl;
				if (!$h.length) { return ''; }
				m = $.metadata ? $h.metadata() : false;
				cl = ' ' + ($h.attr('class') || '');
				if (typeof $h.data(key) !== 'undefined' || typeof $h.data(key.toLowerCase()) !== 'undefined'){
					// "data-lockedOrder" is assigned to "lockedorder"; but "data-locked-order" is assigned to "lockedOrder"
					// "data-sort-initial-order" is assigned to "sortInitialOrder"
					val += $h.data(key) || $h.data(key.toLowerCase());
				} else if (m && typeof m[key] !== 'undefined') {
					val += m[key];
				} else if (ch && typeof ch[key] !== 'undefined') {
					val += ch[key];
				} else if (cl !== ' ' && cl.match(' ' + key + '-')) {
					// include sorter class name "sorter-text", etc
					val = cl.match( new RegExp(' ' + key + '-(\\w+)') )[1] || '';
				}
				return $.trim(val);
			};

			ts.formatFloat = function(s, table) {
				if (typeof(s) !== 'string' || s === '') { return s; }
				// allow using formatFloat without a table; defaults to US number format
				var i,
					t = table && table.config ? table.config.usNumberFormat !== false :
						typeof table !== "undefined" ? table : true;
				if (t) {
					// US Format - 1,234,567.89 -> 1234567.89
					s = s.replace(/,/g,'');
				} else {
					// German Format = 1.234.567,89 -> 1234567.89
					// French Format = 1 234 567,89 -> 1234567.89
					s = s.replace(/[\s|\.]/g,'').replace(/,/g,'.');
				}
				if(/^\s*\([.\d]+\)/.test(s)) {
					// make (#) into a negative number -> (10) = -10
					s = s.replace(/^\s*\(/,'-').replace(/\)/,'');
				}
				i = parseFloat(s);
				// return the text instead of zero
				return isNaN(i) ? $.trim(s) : i;
			};

			ts.isDigit = function(s) {
				// replace all unwanted chars and match
				return isNaN(s) ? (/^[\-+(]?\d+[)]?$/).test(s.toString().replace(/[,.'"\s]/g, '')) : true;
			};

		}()
	});

	// make shortcut
	var ts = $.tablesorter;

	// extend plugin scope
	$.fn.extend({
		tablesorter: ts.construct
	});

	// add default parsers
	ts.addParser({
		id: "text",
		is: function(s, table, node) {
			return true;
		},
		format: function(s, table, cell, cellIndex) {
			var c = table.config;
			s = $.trim( c.ignoreCase ? s.toLocaleLowerCase() : s );
			return c.sortLocaleCompare ? ts.replaceAccents(s) : s;
		},
		type: "text"
	});

	ts.addParser({
		id: "currency",
		is: function(s) {
			return (/^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/).test(s); // £$€¤¥¢
		},
		format: function(s, table) {
			return ts.formatFloat(s.replace(/[^\w,. \-()]/g, ""), table);
		},
		type: "numeric"
	});

	ts.addParser({
		id: "ipAddress",
		is: function(s) {
			return (/^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$/).test(s);
		},
		format: function(s, table) {
			var i, a = s.split("."),
			r = "",
			l = a.length;
			for (i = 0; i < l; i++) {
				r += ("00" + a[i]).slice(-3);
			}
			return ts.formatFloat(r, table);
		},
		type: "numeric"
	});

	ts.addParser({
		id: "url",
		is: function(s) {
			return (/^(https?|ftp|file):\/\//).test(s);
		},
		format: function(s) {
			return $.trim(s.replace(/(https?|ftp|file):\/\//, ''));
		},
		type: "text"
	});

	ts.addParser({
		id: "isoDate",
		is: function(s) {
			return (/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/).test(s);
		},
		format: function(s, table) {
			return ts.formatFloat((s !== "") ? (new Date(s.replace(/-/g, "/")).getTime() || "") : "", table);
		},
		type: "numeric"
	});

	ts.addParser({
		id: "percent",
		is: function(s) {
			return (/(\d\s?%|%\s?\d)/).test(s);
		},
		format: function(s, table) {
			return ts.formatFloat(s.replace(/%/g, ""), table);
		},
		type: "numeric"
	});

	ts.addParser({
		id: "usLongDate",
		is: function(s) {
			// two digit years are not allowed cross-browser
			// Jan 01, 2013 12:34:56 PM or 01 Jan 2013
			return (/^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i).test(s) || (/^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i).test(s);
		},
		format: function(s, table) {
			return ts.formatFloat( (new Date(s.replace(/(\S)([AP]M)$/i, "$1 $2")).getTime() || ''), table);
		},
		type: "numeric"
	});

	ts.addParser({
		id: "shortDate", // "mmddyyyy", "ddmmyyyy" or "yyyymmdd"
		is: function(s) {
			// testing for ####-##-####, so it's not perfect
			return (/^(\d{1,2}|\d{4})[\/\-\,\.\s+]\d{1,2}[\/\-\.\,\s+](\d{1,2}|\d{4})$/).test(s);
		},
		format: function(s, table, cell, cellIndex) {
			var c = table.config, ci = c.headerList[cellIndex],
			format = ci.shortDateFormat;
			if (typeof format === 'undefined') {
				// cache header formatting so it doesn't getData for every cell in the column
				format = ci.shortDateFormat = ts.getData( ci, c.headers[cellIndex], 'dateFormat') || c.dateFormat;
			}
			s = s.replace(/\s+/g," ").replace(/[\-|\.|\,]/g, "/");
			if (format === "mmddyyyy") {
				s = s.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$1/$2");
			} else if (format === "ddmmyyyy") {
				s = s.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$2/$1");
			} else if (format === "yyyymmdd") {
				s = s.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/, "$1/$2/$3");
			}
			return ts.formatFloat( (new Date(s).getTime() || ''), table);
		},
		type: "numeric"
	});

	ts.addParser({
		id: "time",
		is: function(s) {
			return (/^(([0-2]?\d:[0-5]\d)|([0-1]?\d:[0-5]\d\s?([AP]M)))$/i).test(s);
		},
		format: function(s, table) {
			return ts.formatFloat( (new Date("2000/01/01 " + s.replace(/(\S)([AP]M)$/i, "$1 $2")).getTime() || ""), table);
		},
		type: "numeric"
	});

	ts.addParser({
		id: "digit",
		is: function(s) {
			return ts.isDigit(s);
		},
		format: function(s, table) {
			return ts.formatFloat(s.replace(/[^\w,. \-()]/g, ""), table);
		},
		type: "numeric"
	});

	ts.addParser({
		id: "metadata",
		is: function(s) {
			return false;
		},
		format: function(s, table, cell) {
			var c = table.config,
			p = (!c.parserMetadataName) ? 'sortValue' : c.parserMetadataName;
			return $(cell).metadata()[p];
		},
		type: "numeric"
	});

	// add default widgets
	ts.addWidget({
		id: "zebra",
		format: function(table, c, wo) {
			var $tb, $tv, $tr, row, even, time, k, l,
			child = new RegExp(c.cssChildRow, 'i'),
			b = c.$tbodies;
			if (c.debug) {
				time = new Date();
			}
			for (k = 0; k < b.length; k++ ) {
				// loop through the visible rows
				$tb = b.eq(k);
				l = $tb.children('tr').length;
				if (l > 1) {
					row = 0;
					$tv = $tb.children('tr:visible');
					// revered back to using jQuery each - strangely it's the fastest method
					/*jshint loopfunc:true */
					$tv.each(function(){
						$tr = $(this);
						// style children rows the same way the parent row was styled
						if (!child.test(this.className)) { row++; }
						even = (row % 2 === 0);
						$tr.removeClass(wo.zebra[even ? 1 : 0]).addClass(wo.zebra[even ? 0 : 1]);
					});
				}
			}
			if (c.debug) {
				ts.benchmark("Applying Zebra widget", time);
			}
		},
		remove: function(table, c, wo){
			var k, $tb,
				b = c.$tbodies,
				rmv = (c.widgetOptions.zebra || [ "even", "odd" ]).join(' ');
			for (k = 0; k < b.length; k++ ){
				$tb = $.tablesorter.processTbody(table, b.eq(k), true); // remove tbody
				$tb.children().removeClass(rmv);
				$.tablesorter.processTbody(table, $tb, false); // restore tbody
			}
		}
	});

})(jQuery);
/*! tableSorter 2.4+ widgets - updated 1/29/2013
 *
 * Column Styles
 * Column Filters
 * Column Resizing
 * Sticky Header
 * UI Theme (generalized)
 * Save Sort
 * ["zebra", "uitheme", "stickyHeaders", "filter", "columns"]
 */
/*jshint browser:true, jquery:true, unused:false, loopfunc:true */
/*global jQuery: false, localStorage: false, navigator: false */

;(function($){
"use strict";
$.tablesorter = $.tablesorter || {};

$.tablesorter.themes = {
	"bootstrap" : {
		table      : 'table table-bordered table-striped',
		header     : 'bootstrap-header', // give the header a gradient background
		footerRow  : '',
		footerCells: '',
		icons      : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
		sortNone   : 'bootstrap-icon-unsorted',
		sortAsc    : 'icon-chevron-up',
		sortDesc   : 'icon-chevron-down',
		active     : '', // applied when column is sorted
		hover      : '', // use custom css here - bootstrap class may not override it
		filterRow  : '', // filter row class
		even       : '', // even row zebra striping
		odd        : ''  // odd row zebra striping
	},
	"jui" : {
		table      : 'ui-widget ui-widget-content ui-corner-all', // table classes
		header     : 'ui-widget-header ui-corner-all ui-state-default', // header classes
		footerRow  : '',
		footerCells: '',
		icons      : 'ui-icon', // icon class added to the <i> in the header
		sortNone   : 'ui-icon-carat-2-n-s',
		sortAsc    : 'ui-icon-carat-1-n',
		sortDesc   : 'ui-icon-carat-1-s',
		active     : 'ui-state-active', // applied when column is sorted
		hover      : 'ui-state-hover',  // hover class
		filterRow  : '',
		even       : 'ui-widget-content', // even row zebra striping
		odd        : 'ui-state-default'   // odd row zebra striping
	}
};

// *** Store data in local storage, with a cookie fallback ***
/* IE7 needs JSON library for JSON.stringify - (http://caniuse.com/#search=json)
   if you need it, then include https://github.com/douglascrockford/JSON-js

   $.parseJSON is not available is jQuery versions older than 1.4.1, using older
   versions will only allow storing information for one page at a time

   // *** Save data (JSON format only) ***
   // val must be valid JSON... use http://jsonlint.com/ to ensure it is valid
   var val = { "mywidget" : "data1" }; // valid JSON uses double quotes
   // $.tablesorter.storage(table, key, val);
   $.tablesorter.storage(table, 'tablesorter-mywidget', val);

   // *** Get data: $.tablesorter.storage(table, key); ***
   v = $.tablesorter.storage(table, 'tablesorter-mywidget');
   // val may be empty, so also check for your data
   val = (v && v.hasOwnProperty('mywidget')) ? v.mywidget : '';
   alert(val); // "data1" if saved, or "" if not
*/
$.tablesorter.storage = function(table, key, val){
	var d, k, ls = false, v = {},
	id = table.id || $('.tablesorter').index( $(table) ),
	url = window.location.pathname;
	try { ls = !!(localStorage.getItem); } catch(e) {}
	// *** get val ***
	if ($.parseJSON){
		if (ls){
			v = $.parseJSON(localStorage[key]) || {};
		} else {
			k = document.cookie.split(/[;\s|=]/); // cookie
			d = $.inArray(key, k) + 1; // add one to get from the key to the value
			v = (d !== 0) ? $.parseJSON(k[d]) || {} : {};
		}
	}
	// allow val to be an empty string to 
	if ((val || val === '') && window.JSON && JSON.hasOwnProperty('stringify')){
		// add unique identifiers = url pathname > table ID/index on page > data
		if (!v[url]) {
			v[url] = {};
		}
		v[url][id] = val;
		// *** set val ***
		if (ls){
			localStorage[key] = JSON.stringify(v);
		} else {
			d = new Date();
			d.setTime(d.getTime() + (31536e+6)); // 365 days
			document.cookie = key + '=' + (JSON.stringify(v)).replace(/\"/g,'\"') + '; expires=' + d.toGMTString() + '; path=/';
		}
	} else {
		return v && v[url] ? v[url][id] : {};
	}
};

// Widget: General UI theme
// "uitheme" option in "widgetOptions"
// **************************
$.tablesorter.addWidget({
	id: "uitheme",
	format: function(table){
		var time, klass, $el, $tar,
			t = $.tablesorter.themes,
			$t = $(table),
			c = table.config,
			wo = c.widgetOptions,
			theme = c.theme !== 'default' ? c.theme : wo.uitheme || 'jui', // default uitheme is 'jui'
			o = t[ t[theme] ? theme : t[wo.uitheme] ? wo.uitheme : 'jui'],
			$h = $(c.headerList),
			sh = 'tr.' + (wo.stickyHeaders || 'tablesorter-stickyHeader'),
			rmv = o.sortNone + ' ' + o.sortDesc + ' ' + o.sortAsc;
		if (c.debug) { time = new Date(); }
		if (!$t.hasClass('tablesorter-' + theme) || c.theme === theme || !table.hasInitialized){
			// update zebra stripes
			if (o.even !== '') { wo.zebra[0] += ' ' + o.even; }
			if (o.odd !== '') { wo.zebra[1] += ' ' + o.odd; }
			// add table/footer class names
			t = $t
				// remove other selected themes; use widgetOptions.theme_remove
				.removeClass( c.theme === '' ? '' : 'tablesorter-' + c.theme )
				.addClass('tablesorter-' + theme + ' ' + o.table) // add theme widget class name
				.find('tfoot');
			if (t.length) {
				t
				.find('tr').addClass(o.footerRow)
				.children('th, td').addClass(o.footerCells);
			}
			// update header classes
			$h
				.addClass(o.header)
				.filter(':not(.sorter-false)')
				.hover(function(){
					$(this).addClass(o.hover);
				}, function(){
					$(this).removeClass(o.hover);
				});
			if (!$h.find('.tablesorter-wrapper').length) {
				// Firefox needs this inner div to position the resizer correctly
				$h.wrapInner('<div class="tablesorter-wrapper" style="position:relative;height:100%;width:100%"></div>');
			}
			if (c.cssIcon){
				// if c.cssIcon is '', then no <i> is added to the header
				$h.find('.' + c.cssIcon).addClass(o.icons);
			}
			if ($t.hasClass('hasFilters')){
				$h.find('.tablesorter-filter-row').addClass(o.filterRow);
			}
		}
		$.each($h, function(i){
			$el = $(this);
			$tar = (c.cssIcon) ? $el.find('.' + c.cssIcon) : $el;
			if (this.sortDisabled){
				// no sort arrows for disabled columns!
				$el.removeClass(rmv);
				$tar.removeClass(rmv + ' tablesorter-icon ' + o.icons);
			} else {
				t = ($t.hasClass('hasStickyHeaders')) ? $t.find(sh).find('th').eq(i).add($el) : $el;
				klass = ($el.hasClass(c.cssAsc)) ? o.sortAsc : ($el.hasClass(c.cssDesc)) ? o.sortDesc : $el.hasClass(c.cssHeader) ? o.sortNone : '';
				$el[klass === o.sortNone ? 'removeClass' : 'addClass'](o.active);
				$tar.removeClass(rmv).addClass(klass);
			}
		});
		if (c.debug){
			$.tablesorter.benchmark("Applying " + theme + " theme", time);
		}
	},
	remove: function(table, c, wo){
		var $t = $(table),
			theme = typeof wo.uitheme === 'object' ? 'jui' : wo.uitheme || 'jui',
			o = typeof wo.uitheme === 'object' ? wo.uitheme : $.tablesorter.themes[ $.tablesorter.themes.hasOwnProperty(theme) ? theme : 'jui'],
			$h = $t.children('thead').children(),
			rmv = o.sortNone + ' ' + o.sortDesc + ' ' + o.sortAsc;
		$t
			.removeClass('tablesorter-' + theme + ' ' + o.table)
			.find(c.cssHeader).removeClass(o.header);
		$h
			.unbind('mouseenter mouseleave') // remove hover
			.removeClass(o.hover + ' ' + rmv + ' ' + o.active)
			.find('.tablesorter-filter-row').removeClass(o.filterRow);
		$h.find('.tablesorter-icon').removeClass(o.icons);
	}
});

// Widget: Column styles
// "columns", "columns_thead" (true) and
// "columns_tfoot" (true) options in "widgetOptions"
// **************************
$.tablesorter.addWidget({
	id: "columns",
	format: function(table){
		var $tb, $tr, $td, $t, time, last, rmv, i, k, l,
		$tbl = $(table),
		c = table.config,
		wo = c.widgetOptions,
		b = c.$tbodies,
		list = c.sortList,
		len = list.length,
		css = [ "primary", "secondary", "tertiary" ]; // default options
		// keep backwards compatibility, for now
		css = (c.widgetColumns && c.widgetColumns.hasOwnProperty('css')) ? c.widgetColumns.css || css :
			(wo && wo.hasOwnProperty('columns')) ? wo.columns || css : css;
		last = css.length-1;
		rmv = css.join(' ');
		if (c.debug){
			time = new Date();
		}
		// check if there is a sort (on initialization there may not be one)
		for (k = 0; k < b.length; k++ ){
			$tb = $.tablesorter.processTbody(table, b.eq(k), true); // detach tbody
			$tr = $tb.children('tr');
			l = $tr.length;
			// loop through the visible rows
			$tr.each(function(){
				$t = $(this);
				if (this.style.display !== 'none'){
					// remove all columns class names
					$td = $t.children().removeClass(rmv);
					// add appropriate column class names
					if (list && list[0]){
						// primary sort column class
						$td.eq(list[0][0]).addClass(css[0]);
						if (len > 1){
							for (i = 1; i < len; i++){
								// secondary, tertiary, etc sort column classes
								$td.eq(list[i][0]).addClass( css[i] || css[last] );
							}
						}
					}
				}
			});
			$.tablesorter.processTbody(table, $tb, false);
		}
		// add classes to thead and tfoot
		$tr = wo.columns_thead !== false ? 'thead tr' : '';
		if (wo.columns_tfoot !== false) {
			$tr += ($tr === '' ? '' : ',') + 'tfoot tr';
		}
		if ($tr.length) {
			$t = $tbl.find($tr).children().removeClass(rmv);
			if (list && list[0]){
				// primary sort column class
				$t.filter('[data-column="' + list[0][0] + '"]').addClass(css[0]);
				if (len > 1){
					for (i = 1; i < len; i++){
						// secondary, tertiary, etc sort column classes
						$t.filter('[data-column="' + list[i][0] + '"]').addClass(css[i] || css[last]);
					}
				}
			}
		}
		if (c.debug){
			$.tablesorter.benchmark("Applying Columns widget", time);
		}
	},
	remove: function(table, c, wo){
		var k, $tb,
			b = c.$tbodies,
			rmv = (c.widgetOptions.columns || [ "primary", "secondary", "tertiary" ]).join(' ');
		c.$headers.removeClass(rmv);
		$(table).children('tfoot').children('tr').children('th, td').removeClass(rmv);
		for (k = 0; k < b.length; k++ ){
			$tb = $.tablesorter.processTbody(table, b.eq(k), true); // remove tbody
			$tb.children('tr').each(function(){
				$(this).children().removeClass(rmv);
			});
			$.tablesorter.processTbody(table, $tb, false); // restore tbody
		}
	}
});

/* Widget: filter
 widgetOptions:
  filter_childRows     : false  // if true, filter includes child row content in the search
  filter_columnFilters : true   // if true, a filter will be added to the top of each table column
  filter_cssFilter     : 'tablesorter-filter' // css class name added to the filter row & each input in the row
  filter_functions     : null   // add custom filter functions using this option
  filter_hideFilters   : false  // collapse filter row when mouse leaves the area
  filter_ignoreCase    : true   // if true, make all searches case-insensitive
  filter_reset         : null   // jQuery selector string of an element used to reset the filters
  filter_searchDelay   : 300    // typing delay in milliseconds before starting a search
  filter_startsWith    : false  // if true, filter start from the beginning of the cell contents
  filter_useParsedData : false  // filter all data using parsed content
  filter_serversideFiltering : false // if true, server-side filtering should be performed because client-side filtering will be disabled, but the ui and events will still be used.
 **************************/
$.tablesorter.addWidget({
	id: "filter",
	format: function(table){
		if (table.config.parsers && !$(table).hasClass('hasFilters')){
			var i, j, k, l, val, ff, x, xi, st, sel, str,
			ft, ft2, $th, rg, s, t, dis, col,
			last = '', // save last filter search
			ts = $.tablesorter,
			c = table.config,
			$ths = $(c.headerList),
			wo = c.widgetOptions,
			css = wo.filter_cssFilter || 'tablesorter-filter',
			$t = $(table).addClass('hasFilters'),
			b = c.$tbodies,
			cols = c.parsers.length,
			reg = [ // regex used in filter "check" functions
				/^\/((?:\\\/|[^\/])+)\/([mig]{0,3})?$/, // 0 = regex to test for regex
				new RegExp(c.cssChildRow), // 1 = child row
				/undefined|number/, // 2 = check type
				/(^[\"|\'|=])|([\"|\'|=]$)/, // 3 = exact match
				/[\"\'=]/g, // 4 = replace exact match flags
				/[^\w,. \-()]/g, // 5 = replace non-digits (from digit & currency parser)
				/[<>=]/g // 6 = replace operators
			],
			parsed = $ths.map(function(i){
				return (ts.getData) ? ts.getData($ths.filter('[data-column="' + i + '"]:last'), c.headers[i], 'filter') === 'parsed' : $(this).hasClass('filter-parsed');
			}).get(),
			time, timer,

			// dig fer gold
			checkFilters = function(filter){
				var arry = $.isArray(filter),
					$inpts = $t.find('thead').eq(0).children('tr').find('select.' + css + ', input.' + css),
					v = (arry) ? filter : $inpts.map(function(){
						return $(this).val() || '';
					}).get(),
					cv = (v || []).join(''); // combined filter values
				// add filter array back into inputs
				if (arry) {
					$inpts.each(function(i,el){
						$(el).val(filter[i] || '');
					});
				}
				if (wo.filter_hideFilters === true){
					// show/hide filter row as needed
					$t.find('.tablesorter-filter-row').trigger( cv === '' ? 'mouseleave' : 'mouseenter' );
				}
				// return if the last search is the same; but filter === false when updating the search
				// see example-widget-filter.html filter toggle buttons
				if (last === cv && filter !== false) { return; }
				$t.trigger('filterStart', [v]);
				if (c.showProcessing) {
					// give it time for the processing icon to kick in
					setTimeout(function(){
						findRows(filter, v, cv);
						return false;
					}, 30);
				} else {
					findRows(filter, v, cv);
					return false;
				}
			},
			findRows = function(filter, v, cv){
				var $tb, $tr, $td, cr, r, l, ff, time, arry;
				if (c.debug) { time = new Date(); }

				for (k = 0; k < b.length; k++ ){
					$tb = $.tablesorter.processTbody(table, b.eq(k), true);
					$tr = $tb.children('tr');
					l = $tr.length;
					if (cv === '' || wo.filter_serversideFiltering){
						$tr.show().removeClass('filtered');
					} else {
						// loop through the rows
						for (j = 0; j < l; j++){
							// skip child rows
							if (reg[1].test($tr[j].className)) { continue; }
							r = true;
							cr = $tr.eq(j).nextUntil('tr:not(.' + c.cssChildRow + ')');
							// so, if "table.config.widgetOptions.filter_childRows" is true and there is
							// a match anywhere in the child row, then it will make the row visible
							// checked here so the option can be changed dynamically
							t = (cr.length && (wo && wo.hasOwnProperty('filter_childRows') &&
								typeof wo.filter_childRows !== 'undefined' ? wo.filter_childRows : true)) ? cr.text() : '';
							t = wo.filter_ignoreCase ? t.toLocaleLowerCase() : t;
							$td = $tr.eq(j).children('td');
							for (i = 0; i < cols; i++){
								// ignore if filter is empty or disabled
								if (v[i]){
									// check if column data should be from the cell or from parsed data
									if (wo.filter_useParsedData || parsed[i]){
										x = c.cache[k].normalized[j][i];
									} else {
									// using older or original tablesorter
										x = $.trim($td.eq(i).text());
									}
									xi = !reg[2].test(typeof x) && wo.filter_ignoreCase ? x.toLocaleLowerCase() : x;
									ff = r; // if r is true, show that row
									// val = case insensitive, v[i] = case sensitive
									val = wo.filter_ignoreCase ? v[i].toLocaleLowerCase() : v[i];
									if (wo.filter_functions && wo.filter_functions[i]){
										if (wo.filter_functions[i] === true){
											// default selector; no "filter-select" class
											ff = ($ths.filter('[data-column="' + i + '"]:last').hasClass('filter-match')) ? xi.search(val) >= 0 : v[i] === x;
										} else if (typeof wo.filter_functions[i] === 'function'){
											// filter callback( exact cell content, parser normalized content, filter input value, column index )
											ff = wo.filter_functions[i](x, c.cache[k].normalized[j][i], v[i], i);
										} else if (typeof wo.filter_functions[i][v[i]] === 'function'){
											// selector option function
											ff = wo.filter_functions[i][v[i]](x, c.cache[k].normalized[j][i], v[i], i);
										}
									// Look for regex
									} else if (reg[0].test(val)){
										rg = reg[0].exec(val);
										try {
											ff = new RegExp(rg[1], rg[2]).test(xi);
										} catch (err){
											ff = false;
										}
									// Look for quotes or equals to get an exact match
									} else if (reg[3].test(val) && xi === val.replace(reg[4], '')){
										ff = true;
									// Look for a not match
									} else if (/^\!/.test(val)){
										val = val.replace('!','');
										s = xi.search($.trim(val));
										ff = val === '' ? true : !(wo.filter_startsWith ? s === 0 : s >= 0);
									// Look for operators >, >=, < or <=
									} else if (/^[<>]=?/.test(val)){
										// xi may be numeric - see issue #149
										rg = isNaN(xi) ? $.tablesorter.formatFloat(xi.replace(reg[5], ''), table) : $.tablesorter.formatFloat(xi, table);
										s = $.tablesorter.formatFloat(val.replace(reg[5], '').replace(reg[6],''), table);
										if (/>/.test(val)) { ff = />=/.test(val) ? rg >= s : rg > s; }
										if (/</.test(val)) { ff = /<=/.test(val) ? rg <= s : rg < s; }
									// Look for wild card: ? = single, or * = multiple
									} else if (/[\?|\*]/.test(val)){
										ff = new RegExp( val.replace(/\?/g, '\\S{1}').replace(/\*/g, '\\S*') ).test(xi);
									// Look for match, and add child row data for matching
									} else {
										x = (xi + t).indexOf(val);
										ff  = ( (!wo.filter_startsWith && x >= 0) || (wo.filter_startsWith && x === 0) );
									}
									r = (ff) ? (r ? true : false) : false;
								}
							}
							$tr[j].style.display = (r ? '' : 'none');
							$tr.eq(j)[r ? 'removeClass' : 'addClass']('filtered');
							if (cr.length) { cr[r ? 'show' : 'hide'](); }
						}
					}
					$.tablesorter.processTbody(table, $tb, false);
				}

				last = cv; // save last search
				if (c.debug){
					ts.benchmark("Completed filter widget search", time);
				}
				$t.trigger('applyWidgets'); // make sure zebra widget is applied
				$t.trigger('filterEnd');
			},
			buildSelect = function(i, updating){
				var o, arry = [];
				i = parseInt(i, 10);
				o = '<option value="">' + ($ths.filter('[data-column="' + i + '"]:last').attr('data-placeholder') || '') + '</option>';
				for (k = 0; k < b.length; k++ ){
					l = c.cache[k].row.length;
					// loop through the rows
					for (j = 0; j < l; j++){
						// get non-normalized cell content
						if (wo.filter_useParsedData){
							arry.push( '' + c.cache[k].normalized[j][i] );
						} else {
							t = c.cache[k].row[j][0].cells[i];
							if (t){
								arry.push( $.trim(c.supportsTextContent ? t.textContent : $(t).text()) );
							}
						}
					}
				}

				// get unique elements and sort the list
				// if $.tablesorter.sortText exists (not in the original tablesorter),
				// then natural sort the list otherwise use a basic sort
				arry = $.grep(arry, function(v, k){
					return $.inArray(v ,arry) === k;
				});
				arry = (ts.sortText) ? arry.sort(function(a,b){ return ts.sortText(table, a, b, i); }) : arry.sort(true);

				// build option list
				for (k = 0; k < arry.length; k++){
					o += '<option value="' + arry[k] + '">' + arry[k] + '</option>';
				}
				$t.find('thead').find('select.' + css + '[data-column="' + i + '"]')[ updating ? 'html' : 'append' ](o);
			},
			buildDefault = function(updating){
				// build default select dropdown
				for (i = 0; i < cols; i++){
					t = $ths.filter('[data-column="' + i + '"]:last');
					// look for the filter-select class; build/update it if found
					if ((t.hasClass('filter-select') || wo.filter_functions && wo.filter_functions[i] === true) && !t.hasClass('filter-false')){
						if (!wo.filter_functions) { wo.filter_functions = {}; }
						wo.filter_functions[i] = true; // make sure this select gets processed by filter_functions
						buildSelect(i, updating);
					}
				}
			};

			if (c.debug){
				time = new Date();
			}
			wo.filter_ignoreCase = wo.filter_ignoreCase !== false; // set default filter_ignoreCase to true
			wo.filter_useParsedData = wo.filter_useParsedData === true; // default is false
			// don't build filter row if columnFilters is false or all columns are set to "filter-false" - issue #156
			if (wo.filter_columnFilters !== false && $ths.filter('.filter-false').length !== $ths.length){
				t = '<tr class="tablesorter-filter-row">'; // build filter row
				for (i = 0; i < cols; i++){
					dis = false;
					$th = $ths.filter('[data-column="' + i + '"]:last'); // assuming last cell of a column is the main column
					sel = (wo.filter_functions && wo.filter_functions[i] && typeof wo.filter_functions[i] !== 'function') || $th.hasClass('filter-select');
					t += '<td>';
					if (sel){
						t += '<select data-column="' + i + '" class="' + css;
					} else {
						t += '<input type="search" placeholder="' + ($th.attr('data-placeholder') || "") + '" data-column="' + i + '" class="' + css;
					}
					// use header option - headers: { 1: { filter: false } } OR add class="filter-false"
					if (ts.getData){
						dis = ts.getData($th[0], c.headers[i], 'filter') === 'false';
						// get data from jQuery data, metadata, headers option or header class name
						t += dis ? ' disabled" disabled' : '"';
					} else {
						dis = (c.headers[i] && c.headers[i].hasOwnProperty('filter') && c.headers[i].filter === false) || $th.hasClass('filter-false');
						// only class names and header options - keep this for compatibility with tablesorter v2.0.5
						t += (dis) ? ' disabled" disabled' : '"';
					}
					t += (sel ? '></select>' : '>') + '</td>';
				}
				$t.find('thead').eq(0).append(t += '</tr>');
			}
			$t
			// add .tsfilter namespace to all BUT search
			.bind('addRows updateCell update appendCache search'.split(' ').join('.tsfilter '), function(e, filter){
				if (e.type !== 'search'){
					buildDefault(true);
				}
				checkFilters(e.type === 'search' ? filter : '');
				return false;
			})
			.find('input.' + css).bind('keyup search', function(e, filter){
				// ignore arrow and meta keys; allow backspace
				if ((e.which < 32 && e.which !== 8) || (e.which >= 37 && e.which <=40)) { return; }
				// skip delay
				if (typeof filter !== 'undefined'){
					checkFilters(filter);
					return false;
				}
				// delay filtering
				clearTimeout(timer);
				timer = setTimeout(function(){
					checkFilters();
				}, wo.filter_searchDelay || 300);
			});

			// reset button/link
			if (wo.filter_reset && $(wo.filter_reset).length){
				$(wo.filter_reset).bind('click', function(){
					$t.find('.' + css).val('');
					checkFilters();
					return false;
				});
			}
			if (wo.filter_functions){
				// i = column # (string)
				for (col in wo.filter_functions){
					if (wo.filter_functions.hasOwnProperty(col) && typeof col === 'string'){
						t = $ths.filter('[data-column="' + col + '"]:last');
						ff = '';
						if (wo.filter_functions[col] === true && !t.hasClass('filter-false')){
							buildSelect(col);
						} else if (typeof col === 'string' && !t.hasClass('filter-false')){
							// add custom drop down list
							for (str in wo.filter_functions[col]){
								if (typeof str === 'string'){
									ff += ff === '' ? '<option value="">' + (t.attr('data-placeholder') || '') + '</option>' : '';
									ff += '<option value="' + str + '">' + str + '</option>';
								}
							}
							$t.find('thead').find('select.' + css + '[data-column="' + col + '"]').append(ff);
						}
					}
				}
			}
			// not really updating, but if the column has both the "filter-select" class & filter_functions set to true,
			// it would append the same options twice.
			buildDefault(true);

			$t.find('select.' + css).bind('change search', function(){
				checkFilters();
			});

			if (wo.filter_hideFilters === true){
				$t
					.find('.tablesorter-filter-row')
					.addClass('hideme')
					.bind('mouseenter mouseleave', function(e){
						// save event object - http://bugs.jquery.com/ticket/12140
						var all, evt = e;
						ft = $(this);
						clearTimeout(st);
						st = setTimeout(function(){
							if (/enter|over/.test(evt.type)){
								ft.removeClass('hideme');
							} else {
								// don't hide if input has focus
								// $(':focus') needs jQuery 1.6+
								if ($(document.activeElement).closest('tr')[0] !== ft[0]){
									// get all filter values
									all = $t.find('.' + (wo.filter_cssFilter || 'tablesorter-filter')).map(function(){
										return $(this).val() || ''; 
									}).get().join('');
									// don't hide row if any filter has a value
									if (all === ''){
										ft.addClass('hideme');
									}
								}
							}
						}, 200);
					})
					.find('input, select').bind('focus blur', function(e){
						ft2 = $(this).closest('tr');
						clearTimeout(st);
						st = setTimeout(function(){
							// don't hide row if any filter has a value
							if ($t.find('.' + (wo.filter_cssFilter || 'tablesorter-filter')).map(function(){ return $(this).val() || ''; }).get().join('') === ''){
								ft2[ e.type === 'focus' ? 'removeClass' : 'addClass']('hideme');
							}
						}, 200);
					});
			}

			// show processing icon
			if (c.showProcessing) {
				$t.bind('filterStart filterEnd', function(e, v) {
					var fc = (v) ? $t.find('.' + c.cssHeader).filter('[data-column]').filter(function(){
						return v[$(this).data('column')] !== '';
					}) : '';
					ts.isProcessing($t[0], e.type === 'filterStart', v ? fc : '');
				});
			}

			if (c.debug){
				ts.benchmark("Applying Filter widget", time);
			}
			// filter widget initialized
			$t.trigger('filterInit');
		}
	},
	remove: function(table, c, wo){
		var k, $tb,
			$t = $(table),
			b = c.$tbodies;
		$t
			.removeClass('hasFilters')
			// add .tsfilter namespace to all BUT search
			.unbind('addRows updateCell update appendCache search'.split(' ').join('.tsfilter'))
			.find('.tablesorter-filter-row').remove();
		for (k = 0; k < b.length; k++ ){
			$tb = $.tablesorter.processTbody(table, b.eq(k), true); // remove tbody
			$tb.children().removeClass('filtered').show();
			$.tablesorter.processTbody(table, $tb, false); // restore tbody
		}
		if (wo.filterreset) { $(wo.filter_reset).unbind('click'); }
	}
});

// Widget: Sticky headers
// based on this awesome article:
// http://css-tricks.com/13465-persistent-headers/ 
// and https://github.com/jmosbech/StickyTableHeaders by Jonas Mosbech
// **************************
$.tablesorter.addWidget({
	id: "stickyHeaders",
	format: function(table){
		if ($(table).hasClass('hasStickyHeaders')) { return; }
		var $table = $(table).addClass('hasStickyHeaders'),
			c = table.config,
			wo = c.widgetOptions,
			win = $(window),
			header = $(table).children('thead:first'), //.add( $(table).find('caption') ),
			hdrCells = header.children('tr:not(.sticky-false)').children(),
			css = wo.stickyHeaders || 'tablesorter-stickyHeader',
			innr = '.tablesorter-header-inner',
			firstRow = hdrCells.eq(0).parent(),
			tfoot = $table.find('tfoot'),
			t2 = wo.$sticky = $table.clone(), // clone table, but don't remove id... the table might be styled by css
			// clone the entire thead - seems to work in IE8+
			stkyHdr = t2.children('thead:first')
				.addClass(css)
				.css({
					width      : header.outerWidth(true),
					position   : 'fixed',
					margin     : 0,
					top        : 0,
					visibility : 'hidden',
					zIndex     : 1
				}),
			stkyCells = stkyHdr.children('tr:not(.sticky-false)').children(), // issue #172
			laststate = '',
			spacing = 0,
			resizeHdr = function(){
				var bwsr = navigator.userAgent;
				spacing = 0;
				// yes, I dislike browser sniffing, but it really is needed here :(
				// webkit automatically compensates for border spacing
				if ($table.css('border-collapse') !== 'collapse' && !/(webkit|msie)/i.test(bwsr)) {
					// Firefox & Opera use the border-spacing
					// update border-spacing here because of demos that switch themes
					spacing = parseInt(hdrCells.eq(0).css('border-left-width'), 10) * 2;
				}
				stkyHdr.css({
					left : header.offset().left - win.scrollLeft() - spacing,
					width: header.outerWidth()
				});
				stkyCells
				.each(function(i){
					var $h = hdrCells.eq(i);
					$(this).css({
						width: $h.width() - spacing,
						height: $h.height()
					});
				})
				.find(innr).each(function(i){
					var hi = hdrCells.eq(i).find(innr),
						w = hi.width(); // - ( parseInt(hi.css('padding-left'), 10) + parseInt(hi.css('padding-right'), 10) );
					$(this).width(w);
				});
			};
		// clear out cloned table, except for sticky header
		t2.find('thead:gt(0),tr.sticky-false,tbody,tfoot,caption').remove();
		t2.css({ height:0, width:0, padding:0, margin:0, border:0 });
		// remove rows you don't want to be sticky
		stkyHdr.find('tr.sticky-false').remove();
		// remove resizable block
		stkyCells.find('.tablesorter-resizer').remove();
		// update sticky header class names to match real header after sorting
		$table
		.bind('sortEnd.tsSticky', function(){
			hdrCells.each(function(i){
				var t = stkyCells.eq(i);
				t.attr('class', $(this).attr('class'));
				if (c.cssIcon){
					t
					.find('.' + c.cssIcon)
					.attr('class', $(this).find('.' + c.cssIcon).attr('class'));
				}
			});
		})
		.bind('pagerComplete.tsSticky', function(){
			resizeHdr();
		});
		// set sticky header cell width and link clicks to real header
		hdrCells.find('*').andSelf().filter(c.selectorSort).each(function(i){
			var t = $(this);
			stkyCells.eq(i)
			// clicking on sticky will trigger sort
			.bind('mouseup', function(e){
				t.trigger(e, true); // external mouseup flag (click timer is ignored)
			})
			// prevent sticky header text selection
			.bind('mousedown', function(){
				this.onselectstart = function(){ return false; };
				return false;
			});
		});
		// add stickyheaders AFTER the table. If the table is selected by ID, the original one (first) will be returned.
		$table.after( t2 );
		// make it sticky!
		win
		.bind('scroll.tsSticky', function(){
			var offset = firstRow.offset(),
				sTop = win.scrollTop(),
				tableHt = $table.height() - (stkyHdr.height() + (tfoot.height() || 0)),
				vis = (sTop > offset.top) && (sTop < offset.top + tableHt) ? 'visible' : 'hidden';
			stkyHdr
			.css({
				// adjust when scrolling horizontally - fixes issue #143
				left : header.offset().left - win.scrollLeft() - spacing,
				visibility : vis
			});
			if (vis !== laststate){
				// make sure the column widths match
				resizeHdr();
				laststate = vis;
			}
		})
		.bind('resize.tsSticky', function(){
			resizeHdr();
		});
	},
	remove: function(table, c, wo){
		var $t = $(table),
			css = wo.stickyHeaders || 'tablesorter-stickyHeader';
		$t
			.removeClass('hasStickyHeaders')
			.unbind('sortEnd.tsSticky pagerComplete.tsSticky')
			.find('.' + css).remove();
		if (wo.$sticky) { wo.$sticky.remove(); } // remove cloned thead
		$(window).unbind('scroll.tsSticky resize.tsSticky');
	}
});

// Add Column resizing widget
// this widget saves the column widths if
// $.tablesorter.storage function is included
// **************************
$.tablesorter.addWidget({
	id: "resizable",
	format: function(table){
		if ($(table).hasClass('hasResizable')) { return; }
		$(table).addClass('hasResizable');
		var $t, t, i, j, s, $c, $cols, w, tw,
			$tbl = $(table),
			c = table.config,
			wo = c.widgetOptions,
			position = 0,
			$target = null,
			$next = null,
			fullWidth = Math.abs($tbl.parent().width() - $tbl.width()) < 20,
			stopResize = function(){
				if ($.tablesorter.storage && $target){
					s[$target.index()] = $target.width();
					s[$next.index()] = $next.width();
					$target.width( s[$target.index()] );
					$next.width( s[$next.index()] );
					if (wo.resizable !== false){
						$.tablesorter.storage(table, 'tablesorter-resizable', s);
					}
				}
				position = 0;
				$target = $next = null;
				$(window).trigger('resize'); // will update stickyHeaders, just in case
			};
		s = ($.tablesorter.storage && wo.resizable !== false) ? $.tablesorter.storage(table, 'tablesorter-resizable') : {};
		// process only if table ID or url match
		if (s){
			for (j in s){
				if (!isNaN(j) && j < c.headerList.length){
					$(c.headerList[j]).width(s[j]); // set saved resizable widths
				}
			}
		}
		$t = $tbl.children('thead:first').children('tr');
		// add resizable-false class name to headers (across rows as needed)
		$t.children().each(function(){
			t = $(this);
			i = t.attr('data-column');
			j = $.tablesorter.getData( t, c.headers[i], 'resizable') === "false";
			$t.children().filter('[data-column="' + i + '"]').toggleClass('resizable-false', j);
		});
		// add wrapper inside each cell to allow for positioning of the resizable target block
		$t.each(function(){
			$c = $(this).children(':not(.resizable-false)');
			if (!$(this).find('.tablesorter-wrapper').length) {
				// Firefox needs this inner div to position the resizer correctly
				$c.wrapInner('<div class="tablesorter-wrapper" style="position:relative;height:100%;width:100%"></div>');
			}
			$c = $c.slice(0,-1); // don't include the last column of the row
			$cols = $cols ? $cols.add($c) : $c;
		});
		$cols
		.each(function(){
			$t = $(this);
			j = parseInt($t.css('padding-right'), 10) + 10; // 8 is 1/2 of the 16px wide resizer grip
			t = '<div class="tablesorter-resizer" style="cursor:w-resize;position:absolute;z-index:1;right:-' + j +
				'px;top:0;height:100%;width:20px;"></div>';
			$t
				.find('.tablesorter-wrapper')
				.append(t);
		})
		.bind('mousemove.tsresize', function(e){
			// ignore mousemove if no mousedown
			if (position === 0 || !$target) { return; }
			// resize columns
			w = e.pageX - position;
			tw = $target.width();
			$target.width( tw + w );
			if ($target.width() !== tw && fullWidth){
				$next.width( $next.width() - w );
			}
			position = e.pageX;
		})
		.bind('mouseup.tsresize', function(){
			stopResize();
		})
		.find('.tablesorter-resizer,.tablesorter-resizer-grip')
		.bind('mousedown', function(e){
			// save header cell and mouse position; closest() not supported by jQuery v1.2.6
			$target = $(e.target).closest('th');
			t = c.$headers.filter('[data-column="' + $target.attr('data-column') + '"]');
			if (t.length > 1) { $target = $target.add(t); }
			// if table is not as wide as it's parent, then resize the table
			$next = e.shiftKey ? $target.parent().find('th:not(.resizable-false)').filter(':last') : $target.nextAll(':not(.resizable-false)').eq(0);
			position = e.pageX;
		});
		$tbl.find('thead:first')
		.bind('mouseup.tsresize mouseleave.tsresize', function(e){
			stopResize();
		})
		// right click to reset columns to default widths
		.bind('contextmenu.tsresize', function(){
				$.tablesorter.resizableReset(table);
				// $.isEmptyObject() needs jQuery 1.4+
				var rtn = $.isEmptyObject ? $.isEmptyObject(s) : s === {}; // allow right click if already reset
				s = {};
				return rtn;
		});
	},
	remove: function(table, c, wo){
		$(table)
			.removeClass('hasResizable')
			.find('thead')
			.unbind('mouseup.tsresize mouseleave.tsresize contextmenu.tsresize')
			.find('tr').children()
			.unbind('mousemove.tsresize mouseup.tsresize')
			// don't remove "tablesorter-wrapper" as uitheme uses it too
			.find('.tablesorter-resizer,.tablesorter-resizer-grip').remove();
		$.tablesorter.resizableReset(table);
	}
});
$.tablesorter.resizableReset = function(table){
	$(table.config.headerList).filter(':not(.resizable-false)').css('width','');
	if ($.tablesorter.storage) { $.tablesorter.storage(table, 'tablesorter-resizable', {}); }
};

// Save table sort widget
// this widget saves the last sort only if the
// saveSort widget option is true AND the
// $.tablesorter.storage function is included
// **************************
$.tablesorter.addWidget({
	id: 'saveSort',
	init: function(table, thisWidget){
		// run widget format before all other widgets are applied to the table
		thisWidget.format(table, true);
	},
	format: function(table, init){
		var sl, time, c = table.config,
			wo = c.widgetOptions,
			ss = wo.saveSort !== false, // make saveSort active/inactive; default to true
			sortList = { "sortList" : c.sortList };
		if (c.debug){
			time = new Date();
		}
		if ($(table).hasClass('hasSaveSort')){
			if (ss && table.hasInitialized && $.tablesorter.storage){
				$.tablesorter.storage( table, 'tablesorter-savesort', sortList );
				if (c.debug){
					$.tablesorter.benchmark('saveSort widget: Saving last sort: ' + c.sortList, time);
				}
			}
		} else {
			// set table sort on initial run of the widget
			$(table).addClass('hasSaveSort');
			sortList = '';
			// get data
			if ($.tablesorter.storage){
				sl = $.tablesorter.storage( table, 'tablesorter-savesort' );
				sortList = (sl && sl.hasOwnProperty('sortList') && $.isArray(sl.sortList)) ? sl.sortList : '';
				if (c.debug){
					$.tablesorter.benchmark('saveSort: Last sort loaded: "' + sortList + '"', time);
				}
			}
			// init is true when widget init is run, this will run this widget before all other widgets have initialized
			// this method allows using this widget in the original tablesorter plugin; but then it will run all widgets twice.
			if (init && sortList && sortList.length > 0){
				c.sortList = sortList;
			} else if (table.hasInitialized && sortList && sortList.length > 0){
				// update sort change
				$(table).trigger('sorton', [sortList]);
			}
		}
	},
	remove: function(table, c, wo){
		// clear storage
		if ($.tablesorter.storage) { $.tablesorter.storage( table, 'tablesorter-savesort', '' ); }
	}
});

})(jQuery);



/*jshint undef: true */
/*global jQuery: true */

/*
   --------------------------------
   Infinite Scroll
   --------------------------------
   + https://github.com/paulirish/infinite-scroll
   + version 2.0b2.120519
   + Copyright 2011/12 Paul Irish & Luke Shumard
   + Licensed under the MIT license

   + Documentation: http://infinite-scroll.com/
*/


(function (window, $, undefined) {
	"use strict";

    $.infinitescroll = function infscr(options, callback, element) {
        this.element = $(element);

        // Flag the object in the event of a failed creation
        if (!this._create(options, callback)) {
            this.failed = true;
        }
    };

    $.infinitescroll.defaults = {
        loading: {
            finished: undefined,
            finishedMsg: "<em>Congratulations, you've reached the end of the internet.</em>",
			img: "data:image/gif;base64,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",
            msg: null,
            msgText: "<em>Loading the next set of posts...</em>",
            selector: null,
            speed: 'fast',
            start: undefined
        },
        state: {
            isDuringAjax: false,
            isInvalidPage: false,
            isDestroyed: false,
            isDone: false, // For when it goes all the way through the archive.
            isPaused: false,
            isBeyondMaxPage: false,
            currPage: 1
        },
        debug: false,
		behavior: undefined,
        binder: $(window), // used to cache the selector
        nextSelector: "div.navigation a:first",
        navSelector: "div.navigation",
        contentSelector: null, // rename to pageFragment
        extraScrollPx: 150,
        itemSelector: "div.post",
        animate: false,
        pathParse: undefined,
        dataType: 'html',
        appendCallback: true,
        bufferPx: 40,
        errorCallback: function () { },
        infid: 0, //Instance ID
        pixelsFromNavToBottom: undefined,
        path: undefined, // Either parts of a URL as an array (e.g. ["/page/", "/"] or a function that takes in the page number and returns a URL
		prefill: false, // When the document is smaller than the window, load data until the document is larger or links are exhausted
        maxPage: undefined // to manually control maximum page (when maxPage is undefined, maximum page limitation is not work)
	};

    $.infinitescroll.prototype = {

        /*	
            ----------------------------
            Private methods
            ----------------------------
            */

        // Bind or unbind from scroll
        _binding: function infscr_binding(binding) {

            var instance = this,
            opts = instance.options;

            opts.v = '2.0b2.120520';

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_binding_'+opts.behavior] !== undefined) {
                this['_binding_'+opts.behavior].call(this);
                return;
            }

            if (binding !== 'bind' && binding !== 'unbind') {
                this._debug('Binding value  ' + binding + ' not valid');
                return false;
            }

            if (binding === 'unbind') {
                (this.options.binder).unbind('smartscroll.infscr.' + instance.options.infid);
            } else {
                (this.options.binder)[binding]('smartscroll.infscr.' + instance.options.infid, function () {
                    instance.scroll();
                });
            }

            this._debug('Binding', binding);
        },

        // Fundamental aspects of the plugin are initialized
        _create: function infscr_create(options, callback) {

            // Add custom options to defaults
            var opts = $.extend(true, {}, $.infinitescroll.defaults, options);
			this.options = opts;
			var $window = $(window);
			var instance = this;

			// Validate selectors
            if (!instance._validate(options)) {
				return false;
			}

            // Validate page fragment path
            var path = $(opts.nextSelector).attr('href');
            if (!path) {
                this._debug('Navigation selector not found');
                return false;
            }

            // Set the path to be a relative URL from root.
            opts.path = opts.path || this._determinepath(path);

            // contentSelector is 'page fragment' option for .load() / .ajax() calls
            opts.contentSelector = opts.contentSelector || this.element;

            // loading.selector - if we want to place the load message in a specific selector, defaulted to the contentSelector
            opts.loading.selector = opts.loading.selector || opts.contentSelector;

            // Define loading.msg
            opts.loading.msg = opts.loading.msg || $('<div id="infscr-loading"><img alt="Loading..." src="' + opts.loading.img + '" /><div>' + opts.loading.msgText + '</div></div>');

            // Preload loading.img
            (new Image()).src = opts.loading.img;

            // distance from nav links to bottom
            // computed as: height of the document + top offset of container - top offset of nav link
            if(opts.pixelsFromNavToBottom === undefined) {
				opts.pixelsFromNavToBottom = $(document).height() - $(opts.navSelector).offset().top;
				this._debug("pixelsFromNavToBottom: " + opts.pixelsFromNavToBottom);
			}

			var self = this;

            // determine loading.start actions
            opts.loading.start = opts.loading.start || function() {
                $(opts.navSelector).hide();
                opts.loading.msg
                .appendTo(opts.loading.selector)
                .show(opts.loading.speed, $.proxy(function() {
					this.beginAjax(opts);
				}, self));
            };

            // determine loading.finished actions
            opts.loading.finished = opts.loading.finished || function() {
                if (!opts.state.isBeyondMaxPage)
                    opts.loading.msg.fadeOut(opts.loading.speed);
            };

			// callback loading
            opts.callback = function(instance, data, url) {
                if (!!opts.behavior && instance['_callback_'+opts.behavior] !== undefined) {
                    instance['_callback_'+opts.behavior].call($(opts.contentSelector)[0], data, url);
                }

                if (callback) {
                    callback.call($(opts.contentSelector)[0], data, opts, url);
                }

				if (opts.prefill) {
					$window.bind("resize.infinite-scroll", instance._prefill);
				}
            };

			if (options.debug) {
				// Tell IE9 to use its built-in console
				if (Function.prototype.bind && (typeof console === 'object' || typeof console === 'function') && typeof console.log === "object") {
					["log","info","warn","error","assert","dir","clear","profile","profileEnd"]
						.forEach(function (method) {
							console[method] = this.call(console[method], console);
						}, Function.prototype.bind);
				}
			}

            this._setup();

			// Setups the prefill method for use
			if (opts.prefill) {
				this._prefill();
			}

            // Return true to indicate successful creation
            return true;
        },

		_prefill: function infscr_prefill() {
			var instance = this;
			var $window = $(window);

			function needsPrefill() {
				return (instance.options.contentSelector.height() <= $window.height());
			}

			this._prefill = function() {
				if (needsPrefill()) {
					instance.scroll();
				}

				$window.bind("resize.infinite-scroll", function() {
					if (needsPrefill()) {
						$window.unbind("resize.infinite-scroll");
						instance.scroll();
					}
				});
			};

			// Call self after setting up the new function
			this._prefill();
		},

        // Console log wrapper
        _debug: function infscr_debug() {
			if (true !== this.options.debug) {
				return;
			}

			if (typeof console !== 'undefined' && typeof console.log === 'function') {
				// Modern browsers
				// Single argument, which is a string
				if ((Array.prototype.slice.call(arguments)).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === 'string') {
					console.log( (Array.prototype.slice.call(arguments)).toString() );
				} else {
					console.log( Array.prototype.slice.call(arguments) );
				}
			} else if (!Function.prototype.bind && typeof console !== 'undefined' && typeof console.log === 'object') {
				// IE8
				Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
			}
        },

        // find the number to increment in the path.
        _determinepath: function infscr_determinepath(path) {

            var opts = this.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_determinepath_'+opts.behavior] !== undefined) {
                return this['_determinepath_'+opts.behavior].call(this,path);
            }

            if (!!opts.pathParse) {

                this._debug('pathParse manual');
                return opts.pathParse(path, this.options.state.currPage+1);

            } else if (path.match(/^(.*?)\b2\b(.*?$)/)) {
                path = path.match(/^(.*?)\b2\b(.*?$)/).slice(1);

                // if there is any 2 in the url at all.    
            } else if (path.match(/^(.*?)2(.*?$)/)) {

                // page= is used in django:
                // http://www.infinite-scroll.com/changelog/comment-page-1/#comment-127
                if (path.match(/^(.*?page=)2(\/.*|$)/)) {
                    path = path.match(/^(.*?page=)2(\/.*|$)/).slice(1);
                    return path;
                }

                path = path.match(/^(.*?)2(.*?$)/).slice(1);

            } else {

                // page= is used in drupal too but second page is page=1 not page=2:
                // thx Jerod Fritz, vladikoff
                if (path.match(/^(.*?page=)1(\/.*|$)/)) {
                    path = path.match(/^(.*?page=)1(\/.*|$)/).slice(1);
                    return path;
                } else {
                    this._debug('Sorry, we couldn\'t parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.');
                    // Get rid of isInvalidPage to allow permalink to state
                    opts.state.isInvalidPage = true;  //prevent it from running on this page.
                }
            }
            this._debug('determinePath', path);
            return path;

        },

        // Custom error
        _error: function infscr_error(xhr) {

            var opts = this.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_error_'+opts.behavior] !== undefined) {
                this['_error_'+opts.behavior].call(this,xhr);
                return;
            }

            if (xhr !== 'destroy' && xhr !== 'end') {
                xhr = 'unknown';
            }

            this._debug('Error', xhr);

            if (xhr === 'end' || opts.state.isBeyondMaxPage) {
                this._showdonemsg();
            }

            opts.state.isDone = true;
            opts.state.currPage = 1; // if you need to go back to this instance
            opts.state.isPaused = false;
            opts.state.isBeyondMaxPage = false;
            this._binding('unbind');

        },

        // Load Callback
        _loadcallback: function infscr_loadcallback(box, data, url) {
            var opts = this.options,
            callback = this.options.callback, // GLOBAL OBJECT FOR CALLBACK
            result = (opts.state.isDone) ? 'done' : (!opts.appendCallback) ? 'no-append' : 'append',
            frag;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_loadcallback_'+opts.behavior] !== undefined) {
                this['_loadcallback_'+opts.behavior].call(this,box,data);
                return;
            }

			switch (result) {
				case 'done':
					this._showdonemsg();
					return false;

				case 'no-append':
					if (opts.dataType === 'html') {
						data = '<div>' + data + '</div>';
						data = $(data).find(opts.itemSelector);
					}
					break;

				case 'append':
					var children = box.children();
					// if it didn't return anything
					if (children.length === 0) {
						return this._error('end');
					}

					// use a documentFragment because it works when content is going into a table or UL
					frag = document.createDocumentFragment();
					while (box[0].firstChild) {
						frag.appendChild(box[0].firstChild);
					}

					this._debug('contentSelector', $(opts.contentSelector)[0]);
					$(opts.contentSelector)[0].appendChild(frag);
					// previously, we would pass in the new DOM element as context for the callback
					// however we're now using a documentfragment, which doesn't have parents or children,
					// so the context is the contentContainer guy, and we pass in an array
					// of the elements collected as the first argument.

					data = children.get();
					break;
			}

            // loadingEnd function
            opts.loading.finished.call($(opts.contentSelector)[0],opts);

            // smooth scroll to ease in the new content
            if (opts.animate) {
                var scrollTo = $(window).scrollTop() + $(opts.loading.msg).height() + opts.extraScrollPx + 'px';
                $('html,body').animate({ scrollTop: scrollTo }, 800, function () { opts.state.isDuringAjax = false; });
            }

            if (!opts.animate) {
				// once the call is done, we can allow it again.
				opts.state.isDuringAjax = false;
			}

            callback(this, data, url);

			if (opts.prefill) {
				this._prefill();
			}
		},

        _nearbottom: function infscr_nearbottom() {

            var opts = this.options,
            pixelsFromWindowBottomToBottom = 0 + $(document).height() - (opts.binder.scrollTop()) - $(window).height();

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_nearbottom_'+opts.behavior] !== undefined) {
                return this['_nearbottom_'+opts.behavior].call(this);
            }

            this._debug('math:', pixelsFromWindowBottomToBottom, opts.pixelsFromNavToBottom);

            // if distance remaining in the scroll (including buffer) is less than the orignal nav to bottom....
            return (pixelsFromWindowBottomToBottom - opts.bufferPx < opts.pixelsFromNavToBottom);

        },

        // Pause / temporarily disable plugin from firing
        _pausing: function infscr_pausing(pause) {

            var opts = this.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_pausing_'+opts.behavior] !== undefined) {
                this['_pausing_'+opts.behavior].call(this,pause);
                return;
            }

            // If pause is not 'pause' or 'resume', toggle it's value
            if (pause !== 'pause' && pause !== 'resume' && pause !== null) {
                this._debug('Invalid argument. Toggling pause value instead');
            }

            pause = (pause && (pause === 'pause' || pause === 'resume')) ? pause : 'toggle';

            switch (pause) {
                case 'pause':
                    opts.state.isPaused = true;
                break;

                case 'resume':
                    opts.state.isPaused = false;
                break;

                case 'toggle':
                    opts.state.isPaused = !opts.state.isPaused;
                break;
            }

            this._debug('Paused', opts.state.isPaused);
            return false;

        },

        // Behavior is determined
        // If the behavior option is undefined, it will set to default and bind to scroll
        _setup: function infscr_setup() {

            var opts = this.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_setup_'+opts.behavior] !== undefined) {
                this['_setup_'+opts.behavior].call(this);
                return;
            }

            this._binding('bind');

            return false;

        },

        // Show done message
        _showdonemsg: function infscr_showdonemsg() {

            var opts = this.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['_showdonemsg_'+opts.behavior] !== undefined) {
                this['_showdonemsg_'+opts.behavior].call(this);
                return;
            }

            opts.loading.msg
            .find('img')
            .hide()
            .parent()
            .find('div').html(opts.loading.finishedMsg).animate({ opacity: 1 }, 2000, function () {
                $(this).parent().fadeOut(opts.loading.speed);
            });

            // user provided callback when done    
            opts.errorCallback.call($(opts.contentSelector)[0],'done');
        },

        // grab each selector option and see if any fail
        _validate: function infscr_validate(opts) {
            for (var key in opts) {
                if (key.indexOf && key.indexOf('Selector') > -1 && $(opts[key]).length === 0) {
                    this._debug('Your ' + key + ' found no elements.');
                    return false;
                }
            }

            return true;
        },

        /*	
            ----------------------------
            Public methods
            ----------------------------
            */

        // Bind to scroll
        bind: function infscr_bind() {
            this._binding('bind');
        },

        // Destroy current instance of plugin
        destroy: function infscr_destroy() {
            this.options.state.isDestroyed = true;
			this.options.loading.finished();
            return this._error('destroy');
        },

        // Set pause value to false
        pause: function infscr_pause() {
            this._pausing('pause');
        },

        // Set pause value to false
        resume: function infscr_resume() {
            this._pausing('resume');
        },

		beginAjax: function infscr_ajax(opts) {
			var instance = this,
				path = opts.path,
				box, desturl, method, condition;

			// increment the URL bit. e.g. /page/3/
			opts.state.currPage++;

            // Manually control maximum page 
            if ( opts.maxPage != undefined && opts.state.currPage > opts.maxPage ){
                opts.state.isBeyondMaxPage = true;
                this.destroy();
                return;
            }

			// if we're dealing with a table we can't use DIVs
			box = $(opts.contentSelector).is('table, tbody') ? $('<tbody/>') : $('<div/>');

			desturl = (typeof path === 'function') ? path(opts.state.currPage) : path.join(opts.state.currPage);
			instance._debug('heading into ajax', desturl);

			method = (opts.dataType === 'html' || opts.dataType === 'json' ) ? opts.dataType : 'html+callback';
			if (opts.appendCallback && opts.dataType === 'html') {
				method += '+callback';
			}

			switch (method) {
				case 'html+callback':
					instance._debug('Using HTML via .load() method');
					box.load(desturl + ' ' + opts.itemSelector, undefined, function infscr_ajax_callback(responseText) {
						instance._loadcallback(box, responseText, desturl);
					});

					break;

				case 'html':
					instance._debug('Using ' + (method.toUpperCase()) + ' via $.ajax() method');
					$.ajax({
						// params
						url: desturl,
						dataType: opts.dataType,
						complete: function infscr_ajax_callback(jqXHR, textStatus) {
							condition = (typeof (jqXHR.isResolved) !== 'undefined') ? (jqXHR.isResolved()) : (textStatus === "success" || textStatus === "notmodified");
							if (condition) {
								instance._loadcallback(box, jqXHR.responseText, desturl);
							} else {
								instance._error('end');
							}
						}
					});

					break;
				case 'json':
					instance._debug('Using ' + (method.toUpperCase()) + ' via $.ajax() method');
					$.ajax({
						dataType: 'json',
						type: 'GET',
						url: desturl,
						success: function (data, textStatus, jqXHR) {
							condition = (typeof (jqXHR.isResolved) !== 'undefined') ? (jqXHR.isResolved()) : (textStatus === "success" || textStatus === "notmodified");
							if (opts.appendCallback) {
								// if appendCallback is true, you must defined template in options.
								// note that data passed into _loadcallback is already an html (after processed in opts.template(data)).
								if (opts.template !== undefined) {
									var theData = opts.template(data);
									box.append(theData);
									if (condition) {
										instance._loadcallback(box, theData);
									} else {
										instance._error('end');
									}
								} else {
									instance._debug("template must be defined.");
									instance._error('end');
								}
							} else {
								// if appendCallback is false, we will pass in the JSON object. you should handle it yourself in your callback.
								if (condition) {
									instance._loadcallback(box, data, desturl);
								} else {
									instance._error('end');
								}
							}
						},
						error: function() {
							instance._debug("JSON ajax request failed.");
							instance._error('end');
						}
					});

					break;
			}
		},

        // Retrieve next set of content items
        retrieve: function infscr_retrieve(pageNum) {
			pageNum = pageNum || null;

			var instance = this,
            opts = instance.options;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['retrieve_'+opts.behavior] !== undefined) {
                this['retrieve_'+opts.behavior].call(this,pageNum);
                return;
            }

            // for manual triggers, if destroyed, get out of here
            if (opts.state.isDestroyed) {
                this._debug('Instance is destroyed');
                return false;
            }

            // we dont want to fire the ajax multiple times
            opts.state.isDuringAjax = true;

            opts.loading.start.call($(opts.contentSelector)[0],opts);
        },

        // Check to see next page is needed
        scroll: function infscr_scroll() {

            var opts = this.options,
            state = opts.state;

            // if behavior is defined and this function is extended, call that instead of default
            if (!!opts.behavior && this['scroll_'+opts.behavior] !== undefined) {
                this['scroll_'+opts.behavior].call(this);
                return;
            }

            if (state.isDuringAjax || state.isInvalidPage || state.isDone || state.isDestroyed || state.isPaused) {
				return;
			}

            if (!this._nearbottom()) {
				return;
			}

            this.retrieve();

        },

        // Toggle pause value
        toggle: function infscr_toggle() {
            this._pausing();
        },

        // Unbind from scroll
        unbind: function infscr_unbind() {
            this._binding('unbind');
        },

        // update options
        update: function infscr_options(key) {
            if ($.isPlainObject(key)) {
                this.options = $.extend(true,this.options,key);
            }
        }
    };


    /*	
        ----------------------------
        Infinite Scroll function
        ----------------------------

        Borrowed logic from the following...

        jQuery UI
        - https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.widget.js

        jCarousel
        - https://github.com/jsor/jcarousel/blob/master/lib/jquery.jcarousel.js

        Masonry
        - https://github.com/desandro/masonry/blob/master/jquery.masonry.js		

*/

    $.fn.infinitescroll = function infscr_init(options, callback) {


        var thisCall = typeof options;

        switch (thisCall) {

            // method 
            case 'string':
                var args = Array.prototype.slice.call(arguments, 1);

				this.each(function () {
					var instance = $.data(this, 'infinitescroll');

					if (!instance) {
						// not setup yet
						// return $.error('Method ' + options + ' cannot be called until Infinite Scroll is setup');
						return false;
					}

					if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
						// return $.error('No such method ' + options + ' for Infinite Scroll');
						return false;
					}

					// no errors!
					instance[options].apply(instance, args);
				});

            break;

            // creation 
            case 'object':

                this.each(function () {

                var instance = $.data(this, 'infinitescroll');

                if (instance) {

                    // update options of current instance
                    instance.update(options);

                } else {

                    // initialize new instance
                    instance = new $.infinitescroll(options, callback, this);

                    // don't attach if instantiation failed
                    if (!instance.failed) {
                        $.data(this, 'infinitescroll', instance);
                    }

                }

            });

            break;

        }

        return this;
    };



    /* 
     * smartscroll: debounced scroll event for jQuery *
     * https://github.com/lukeshumard/smartscroll
     * Based on smartresize by @louis_remi: https://github.com/lrbabe/jquery.smartresize.js *
     * Copyright 2011 Louis-Remi & Luke Shumard * Licensed under the MIT license. *
     */

    var event = $.event,
    scrollTimeout;

    event.special.smartscroll = {
        setup: function () {
            $(this).bind("scroll", event.special.smartscroll.handler);
        },
        teardown: function () {
            $(this).unbind("scroll", event.special.smartscroll.handler);
        },
        handler: function (event, execAsap) {
            // Save the context
            var context = this,
            args = arguments;

            // set correct event type
            event.type = "smartscroll";

            if (scrollTimeout) { clearTimeout(scrollTimeout); }
            scrollTimeout = setTimeout(function () {
                $(context).trigger('smartscroll', args);
            }, execAsap === "execAsap" ? 0 : 100);
        }
    };

    $.fn.smartscroll = function (fn) {
        return fn ? this.bind("smartscroll", fn) : this.trigger("smartscroll", ["execAsap"]);
    };


})(window, jQuery);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
var censusData;

function initialize() {

	var map = new google.maps.Map(document.getElementById('map-canvas'), {
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var defaultBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(32.801993,-80.085236), // lower left
		new google.maps.LatLng(32.92369,-79.833924)); // upper right
	map.fitBounds(defaultBounds);


  var input = /** @type {HTMLInputElement} */(document.getElementById('searchBoxTarget'));
  var searchBox = new google.maps.places.SearchBox(input);
  var markers = [];

		// hanahan
	  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.899480,-80.011711),
			new google.maps.LatLng(32.955961,-80.041752),
			new google.maps.LatLng(32.974828,-80.040722),
			new google.maps.LatLng(32.961866,-80.000725),
			new google.maps.LatLng(32.921529,-79.991455),
			new google.maps.LatLng(32.926140,-79.990940),
			new google.maps.LatLng(32.925996,-79.990253),
			new google.maps.LatLng(32.924699,-79.988708),
			new google.maps.LatLng(32.924843,-79.986305),
			new google.maps.LatLng(32.926572,-79.985962),
			new google.maps.LatLng(32.927869,-79.986477),
			new google.maps.LatLng(32.929454,-79.988194),
			new google.maps.LatLng(32.929454,-79.990597),
			new google.maps.LatLng(32.930895,-79.990940),
			new google.maps.LatLng(32.932479,-79.991455),
			new google.maps.LatLng(32.934641,-79.991627),
			new google.maps.LatLng(32.935937,-79.990082),
			new google.maps.LatLng(32.935793,-79.987679),
			new google.maps.LatLng(32.935649,-79.986649),
			new google.maps.LatLng(32.933488,-79.985790),
			new google.maps.LatLng(32.932047,-79.985447),
			new google.maps.LatLng(32.932768,-79.983387),
			new google.maps.LatLng(32.933488,-79.982014),
			new google.maps.LatLng(32.934064,-79.981327),
			new google.maps.LatLng(32.935505,-79.980640),
			new google.maps.LatLng(32.937522,-79.982357),
			new google.maps.LatLng(32.940403,-79.982014),
			new google.maps.LatLng(32.941268,-79.984417),
			new google.maps.LatLng(32.942276,-79.984417),
			new google.maps.LatLng(32.943429,-79.982700),
			new google.maps.LatLng(32.945301,-79.982529),
			new google.maps.LatLng(32.944581,-79.980297),
			new google.maps.LatLng(32.943717,-79.978065),
			new google.maps.LatLng(32.941412,-79.976521),
			new google.maps.LatLng(32.941412,-79.974461),
			new google.maps.LatLng(32.939107,-79.974804),
			new google.maps.LatLng(32.936946,-79.975147),
			new google.maps.LatLng(32.935361,-79.975319),
			new google.maps.LatLng(32.933344,-79.974632),
			new google.maps.LatLng(32.931903,-79.973087),
			new google.maps.LatLng(32.930606,-79.971027),
			new google.maps.LatLng(32.929886,-79.970684),
			new google.maps.LatLng(32.924987,-79.970684),
			new google.maps.LatLng(32.922105,-79.966393),
			new google.maps.LatLng(32.919656,-79.961414),
			new google.maps.LatLng(32.920088,-79.957981),
			new google.maps.LatLng(32.918070,-79.957809),
			new google.maps.LatLng(32.916629,-79.957809),
			new google.maps.LatLng(32.915621,-79.956093),
			new google.maps.LatLng(32.914036,-79.955578),
			new google.maps.LatLng(32.910000,-79.951973),
			new google.maps.LatLng(32.908127,-79.953003),
			new google.maps.LatLng(32.906398,-79.954720)
			];
			
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> Hanahan</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 200,
			maxHeight: 200,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(32.934208,-80.008648 ),
		    map: map,
		    title: 'Hanahan'
		});

	  	infowindow.open(map,marker);

		// end hanahan

		// north charleston
	  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.824211,-79.953690),
			new google.maps.LatLng(32.828827,-79.964676),
			new google.maps.LatLng(32.834020,-79.968109),
			new google.maps.LatLng(32.834597,-79.976349),
			new google.maps.LatLng(32.835751,-79.989395),
			new google.maps.LatLng(32.831712,-79.999695),
			new google.maps.LatLng(32.828250,-80.011368),
			new google.maps.LatLng(32.829404,-80.018234),
			new google.maps.LatLng(32.846712,-80.039520),
			new google.maps.LatLng(32.846712,-80.047760),
			new google.maps.LatLng(32.870937,-80.069733),
			new google.maps.LatLng(32.873820,-80.078659),
			new google.maps.LatLng(32.881894,-80.081406),
			new google.maps.LatLng(32.898038,-80.112991),
			new google.maps.LatLng(32.940115,-80.164490),
			new google.maps.LatLng(32.977564,-80.114365),
			new google.maps.LatLng(32.983324,-80.095139),
			new google.maps.LatLng(32.996859,-80.058060),
			new google.maps.LatLng(32.990236,-80.054970),
			new google.maps.LatLng(32.985916,-80.047760),
			new google.maps.LatLng(32.980156,-80.044327),
			new google.maps.LatLng(32.963163,-80.044327),
			new google.maps.LatLng(32.938674,-80.039177),
			new google.maps.LatLng(32.898903,-80.016518),
			new google.maps.LatLng(32.902939,-79.974289),
			new google.maps.LatLng(32.900633,-79.961586),
			new google.maps.LatLng(32.898903,-79.958153),
			new google.maps.LatLng(32.887948,-79.962616),
			new google.maps.LatLng(32.878146,-79.961586),
			new google.maps.LatLng(32.879875,-79.965019),
			new google.maps.LatLng(32.872955,-79.963303),
			new google.maps.LatLng(32.867477,-79.960556),
			new google.maps.LatLng(32.859114,-79.955750),
			new google.maps.LatLng(32.853057,-79.939957),
			new google.maps.LatLng(32.847289,-79.931717),
			new google.maps.LatLng(32.842962,-79.932747),
			new google.maps.LatLng(32.834308,-79.933090),
			new google.maps.LatLng(32.828539,-79.933434),
			new google.maps.LatLng(32.830558,-79.940987),
			new google.maps.LatLng(32.823634,-79.951630)
			];
			
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> North Charleston</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 130,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(32.913459,-80.106495 ),
		    map: map,
		    title: 'North Charleston'
		});

	  	infowindow.open(map,marker);
		// end north charleston
		
		
		// goose creek
	  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.911297,-79.951630),
			new google.maps.LatLng(32.914756,-79.932404),
			new google.maps.LatLng(32.926860,-79.939270),
			new google.maps.LatLng(32.932623,-79.939957),
			new google.maps.LatLng(32.937810,-79.938583),
			new google.maps.LatLng(32.938963,-79.929657),
			new google.maps.LatLng(32.941268,-79.928284),
			new google.maps.LatLng(32.947606,-79.930344),
			new google.maps.LatLng(32.953944,-79.931030),
			new google.maps.LatLng(32.959706,-79.920731),
			new google.maps.LatLng(32.967771,-79.927597),
			new google.maps.LatLng(32.967771,-79.932060),
			new google.maps.LatLng(32.966331,-79.935493),
			new google.maps.LatLng(32.967483,-79.939613),
			new google.maps.LatLng(32.971804,-79.941330),
			new google.maps.LatLng(32.975548,-79.941330),
			new google.maps.LatLng(32.979580,-79.942360),
			new google.maps.LatLng(32.983612,-79.942017),
			new google.maps.LatLng(32.987644,-79.943390),
			new google.maps.LatLng(32.993691,-79.939613),
			new google.maps.LatLng(32.997722,-79.938927),
			new google.maps.LatLng(33.001178,-79.938927),
			new google.maps.LatLng(33.005209,-79.940643),
			new google.maps.LatLng(33.009239,-79.939270),
			new google.maps.LatLng(33.013558,-79.943390),
			new google.maps.LatLng(33.015573,-79.946480),
			new google.maps.LatLng(33.019891,-79.951286),
			new google.maps.LatLng(33.022770,-79.955406),
			new google.maps.LatLng(33.022194,-79.957123),
			new google.maps.LatLng(33.021618,-79.960213),
			new google.maps.LatLng(33.020755,-79.962616),
			new google.maps.LatLng(33.020179,-79.967766),
			new google.maps.LatLng(33.020179,-79.973259),
			new google.maps.LatLng(33.021043,-79.993515),
			new google.maps.LatLng(33.022194,-79.997635),
			new google.maps.LatLng(33.030542,-80.013428),
			new google.maps.LatLng(33.039176,-80.009995),
			new google.maps.LatLng(33.040903,-80.011368),
			new google.maps.LatLng(33.039752,-80.017204),
			new google.maps.LatLng(33.038313,-80.022697),
			new google.maps.LatLng(33.035147,-80.029564),
			new google.maps.LatLng(33.032844,-80.035057),
			new google.maps.LatLng(33.034859,-80.059433),
			new google.maps.LatLng(33.032269,-80.065613),
			new google.maps.LatLng(33.028527,-80.075226),
			new google.maps.LatLng(33.027088,-80.079002),
			new google.maps.LatLng(33.024209,-80.088959),
			new google.maps.LatLng(33.009239,-80.088272),
			new google.maps.LatLng(33.002905,-80.088615),
			new google.maps.LatLng(32.999738,-80.092049),
			new google.maps.LatLng(32.993115,-80.087242),
			new google.maps.LatLng(32.995995,-80.070419),
			new google.maps.LatLng(32.998298,-80.057373),
			new google.maps.LatLng(32.987932,-80.046387),
			new google.maps.LatLng(32.982172,-80.046043),
			new google.maps.LatLng(32.977852,-80.045013),
			new google.maps.LatLng(32.977276,-80.037117),
			new google.maps.LatLng(32.972380,-80.022011),
			new google.maps.LatLng(32.968923,-80.004845),
			new google.maps.LatLng(32.960570,-80.006561),
			new google.maps.LatLng(32.952504,-80.001755),
			new google.maps.LatLng(32.934064,-79.997292),
			new google.maps.LatLng(32.927148,-79.995575),
			new google.maps.LatLng(32.919656,-79.990425),
			new google.maps.LatLng(32.923114,-79.992485),
			new google.maps.LatLng(32.925131,-79.992485),
			new google.maps.LatLng(32.925996,-79.990082),
			new google.maps.LatLng(32.923690,-79.989395),
			new google.maps.LatLng(32.926860,-79.984932),
			new google.maps.LatLng(32.930030,-79.986305),
			new google.maps.LatLng(32.929742,-79.989395),
			new google.maps.LatLng(32.930606,-79.991455),
			new google.maps.LatLng(32.935505,-79.992142),
			new google.maps.LatLng(32.936081,-79.988365),
			new google.maps.LatLng(32.936081,-79.986305),
			new google.maps.LatLng(32.932912,-79.985275),
			new google.maps.LatLng(32.934064,-79.980125),
			new google.maps.LatLng(32.936369,-79.980812),
			new google.maps.LatLng(32.937522,-79.982185),
			new google.maps.LatLng(32.940691,-79.982185),
			new google.maps.LatLng(32.940980,-79.983902),
			new google.maps.LatLng(32.942996,-79.984245),
			new google.maps.LatLng(32.945301,-79.982872),
			new google.maps.LatLng(32.943861,-79.978065),
			new google.maps.LatLng(32.941556,-79.974632),
			new google.maps.LatLng(32.939539,-79.976006),
			new google.maps.LatLng(32.937810,-79.972572),
			new google.maps.LatLng(32.935217,-79.974289),
			new google.maps.LatLng(32.931759,-79.973946),
			new google.maps.LatLng(32.929166,-79.969826),
			new google.maps.LatLng(32.925996,-79.969482),
			new google.maps.LatLng(32.921961,-79.965363),
			new google.maps.LatLng(32.919656,-79.959869),
			new google.maps.LatLng(32.920808,-79.957809),
			new google.maps.LatLng(32.916197,-79.957123),
			new google.maps.LatLng(32.915044,-79.955750),
			new google.maps.LatLng(32.911586,-79.953346)			];
			
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> Goose Creek</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 130,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(33.010823,-80.033711 ),
		    map: map,
		    title: 'Goose Creek'
		});

	  	infowindow.open(map,marker); // end goose creek

		
		
		// west ashley
	  	var neighborhoodCoordinates_01 =
		[
		new google.maps.LatLng(32.775440,-79.956436),
		new google.maps.LatLng(32.789872,-79.972916),
		new google.maps.LatLng(32.798530,-79.976692),
		new google.maps.LatLng(32.819018,-79.968109),
		new google.maps.LatLng(32.829404,-79.977379),
		new google.maps.LatLng(32.830558,-79.986649),
		new google.maps.LatLng(32.829116,-80.001411),
		new google.maps.LatLng(32.826519,-80.004845),
		new google.maps.LatLng(32.823923,-80.009308),
		new google.maps.LatLng(32.824788,-80.017891),
		new google.maps.LatLng(32.828539,-80.021324),
		new google.maps.LatLng(32.831712,-80.022011),
		new google.maps.LatLng(32.839501,-80.034714),
		new google.maps.LatLng(32.845270,-80.039177),
		new google.maps.LatLng(32.845846,-80.049820),
		new google.maps.LatLng(32.840366,-80.061150),
		new google.maps.LatLng(32.821037,-80.089989),
		new google.maps.LatLng(32.812959,-80.103035),
		new google.maps.LatLng(32.798819,-80.104408),
		new google.maps.LatLng(32.785543,-80.059776),
		new google.maps.LatLng(32.782656,-80.025444),
		new google.maps.LatLng(32.777749,-79.999352),
		new google.maps.LatLng(32.775729,-79.962273)
		];
		
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> West Ashley</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 130,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(32.803148,-80.04232 ),
		    map: map,
		    title: 'West Ashley'
		});

	  	infowindow.open(map,marker); // end west ashley

		// summerville
	  	var neighborhoodCoordinates_01 =
		[
		new google.maps.LatLng(33.064500,-80.182343),
		new google.maps.LatLng(32.986204,-80.262680),
		new google.maps.LatLng(32.971804,-80.224228),
		new google.maps.LatLng(32.957401,-80.186462),
		new google.maps.LatLng(32.949335,-80.176163),
		new google.maps.LatLng(32.968347,-80.150757),
		new google.maps.LatLng(32.987932,-80.109558),
		new google.maps.LatLng(33.013846,-80.160370),
		new google.maps.LatLng(33.030542,-80.143204)
		];
		
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> Summerville</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 130,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(33.015573,-80.182396),
		    map: map,
		    title: 'Summerville'
		});

	  	infowindow.open(map,marker); // end summerville

		// downtown Charleston
	  	var neighborhoodCoordinates_01 =
		[
		new google.maps.LatLng(32.811804,-79.963646),
		new google.maps.LatLng(32.799252,-79.967594),
		new google.maps.LatLng(32.794346,-79.967937),
		new google.maps.LatLng(32.792037,-79.967766),
		new google.maps.LatLng(32.790882,-79.966221),
		new google.maps.LatLng(32.789728,-79.963646),
		new google.maps.LatLng(32.786409,-79.959526),
		new google.maps.LatLng(32.782079,-79.955406),
		new google.maps.LatLng(32.779337,-79.950600),
		new google.maps.LatLng(32.780636,-79.949226),
		new google.maps.LatLng(32.780636,-79.948025),
		new google.maps.LatLng(32.774285,-79.945450),
		new google.maps.LatLng(32.769955,-79.936695),
		new google.maps.LatLng(32.769522,-79.928799),
		new google.maps.LatLng(32.772842,-79.926910),
		new google.maps.LatLng(32.772986,-79.925537),
		new google.maps.LatLng(32.775007,-79.925365),
		new google.maps.LatLng(32.784965,-79.921932),
		new google.maps.LatLng(32.785543,-79.923992),
		new google.maps.LatLng(32.785976,-79.923992),
		new google.maps.LatLng(32.786409,-79.925194),
		new google.maps.LatLng(32.788140,-79.924679),
		new google.maps.LatLng(32.789295,-79.923477),
		new google.maps.LatLng(32.801128,-79.930000),
		new google.maps.LatLng(32.801272,-79.931374),
		new google.maps.LatLng(32.804446,-79.933777),
		new google.maps.LatLng(32.806466,-79.933434),
		new google.maps.LatLng(32.806466,-79.934978),
		new google.maps.LatLng(32.809496,-79.934978),
		new google.maps.LatLng(32.813680,-79.930687),
		new google.maps.LatLng(32.814834,-79.930859),
		new google.maps.LatLng(32.816998,-79.933434),
		new google.maps.LatLng(32.819162,-79.933777),
		new google.maps.LatLng(32.822336,-79.933949),
		new google.maps.LatLng(32.813103,-79.961758),
		new google.maps.LatLng(32.823923,-79.935150),
		new google.maps.LatLng(32.822624,-79.948540),
		new google.maps.LatLng(32.820460,-79.957809)
		];

		
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> Downtown Charleston</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 130,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(32.772842,-79.933804),
		    map: map,
		    title: 'Downtown Charleston'
		});

	  	infowindow.open(map,marker); // end downtown charleston


		// james island
	  	var neighborhoodCoordinates_01 =
		[
		new google.maps.LatLng(32.765336,-79.999695),
		new google.maps.LatLng(32.761872,-79.999695),
		new google.maps.LatLng(32.760717,-80.003128),
		new google.maps.LatLng(32.757541,-80.006218),
		new google.maps.LatLng(32.751189,-80.007935),
		new google.maps.LatLng(32.746858,-80.004845),
		new google.maps.LatLng(32.742237,-80.004845),
		new google.maps.LatLng(32.734440,-80.005531),
		new google.maps.LatLng(32.728086,-80.007248),
		new google.maps.LatLng(32.725776,-80.005188),
		new google.maps.LatLng(32.725487,-80.001755),
		new google.maps.LatLng(32.722021,-79.995575),
		new google.maps.LatLng(32.721154,-79.990768),
		new google.maps.LatLng(32.716822,-79.986305),
		new google.maps.LatLng(32.706711,-79.985962),
		new google.maps.LatLng(32.702089,-79.985962),
		new google.maps.LatLng(32.699489,-79.984245),
		new google.maps.LatLng(32.691399,-79.985619),
		new google.maps.LatLng(32.688509,-79.989395),
		new google.maps.LatLng(32.686776,-79.997978),
		new google.maps.LatLng(32.681574,-80.001411),
		new google.maps.LatLng(32.678107,-79.999008),
		new google.maps.LatLng(32.676373,-79.993515),
		new google.maps.LatLng(32.677240,-79.989738),
		new google.maps.LatLng(32.678107,-79.981155),
		new google.maps.LatLng(32.680418,-79.972916),
		new google.maps.LatLng(32.684753,-79.967079),
		new google.maps.LatLng(32.686487,-79.958839),
		new google.maps.LatLng(32.690821,-79.949570),
		new google.maps.LatLng(32.700933,-79.942360),
		new google.maps.LatLng(32.707578,-79.937553),
		new google.maps.LatLng(32.711044,-79.937897),
		new google.maps.LatLng(32.715089,-79.945107),
		new google.maps.LatLng(32.715955,-79.938583),
		new google.maps.LatLng(32.718844,-79.928284),
		new google.maps.LatLng(32.721154,-79.932060),
		new google.maps.LatLng(32.722599,-79.919014),
		new google.maps.LatLng(32.726065,-79.913864),
		new google.maps.LatLng(32.724909,-79.906654),
		new google.maps.LatLng(32.728086,-79.900131),
		new google.maps.LatLng(32.726353,-79.893951),
		new google.maps.LatLng(32.735307,-79.888802),
		new google.maps.LatLng(32.739638,-79.888115),
		new google.maps.LatLng(32.743681,-79.880219),
		new google.maps.LatLng(32.750900,-79.879875),
		new google.maps.LatLng(32.750900,-79.890175),
		new google.maps.LatLng(32.750034,-79.891548),
		new google.maps.LatLng(32.747724,-79.892921),
		new google.maps.LatLng(32.744547,-79.894638),
		new google.maps.LatLng(32.747435,-79.898071),
		new google.maps.LatLng(32.752633,-79.897728),
		new google.maps.LatLng(32.752633,-79.902534),
		new google.maps.LatLng(32.754654,-79.917297),
		new google.maps.LatLng(32.753210,-79.919357),
		new google.maps.LatLng(32.752055,-79.923820),
		new google.maps.LatLng(32.758696,-79.926224),
		new google.maps.LatLng(32.761872,-79.936867),
		new google.maps.LatLng(32.755520,-79.943047),
		new google.maps.LatLng(32.758118,-79.946823),
		new google.maps.LatLng(32.761006,-79.946823),
		new google.maps.LatLng(32.762160,-79.949226),
		new google.maps.LatLng(32.762738,-79.954033),
		new google.maps.LatLng(32.763315,-79.946136),
		new google.maps.LatLng(32.767068,-79.942360),
		new google.maps.LatLng(32.771976,-79.950600),
		new google.maps.LatLng(32.767646,-79.961586),
		new google.maps.LatLng(32.766202,-79.970512),
		new google.maps.LatLng(32.766202,-79.976349),
		new google.maps.LatLng(32.764470,-79.981155),
		new google.maps.LatLng(32.767068,-79.988022),
		new google.maps.LatLng(32.767646,-79.993858)
		];

		
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> James Island</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 130,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(32.726065,-79.96267),
		    map: map,
		    title: 'James Island'
		});

	  	infowindow.open(map,marker); // end james island

			// johns island
		  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.768223,-80.015488),
			new google.maps.LatLng(32.765336,-80.007935),
			new google.maps.LatLng(32.759562,-80.014114),
			new google.maps.LatLng(32.751478,-80.012054),
			new google.maps.LatLng(32.743392,-80.009995),
			new google.maps.LatLng(32.730686,-80.010681),
			new google.maps.LatLng(32.721443,-80.005875),
			new google.maps.LatLng(32.714511,-79.990768),
			new google.maps.LatLng(32.706422,-79.990082),
			new google.maps.LatLng(32.696600,-79.990082),
			new google.maps.LatLng(32.689665,-79.993515),
			new google.maps.LatLng(32.684464,-80.004501),
			new google.maps.LatLng(32.675795,-80.003815),
			new google.maps.LatLng(32.665969,-80.001755),
			new google.maps.LatLng(32.656141,-80.014114),
			new google.maps.LatLng(32.643422,-80.020294),
			new google.maps.LatLng(32.638797,-80.051193),
			new google.maps.LatLng(32.620870,-80.084839),
			new google.maps.LatLng(32.619135,-80.107498),
			new google.maps.LatLng(32.619714,-80.124664),
			new google.maps.LatLng(32.612195,-80.151443),
			new google.maps.LatLng(32.606989,-80.170670),
			new google.maps.LatLng(32.598891,-80.180969),
			new google.maps.LatLng(32.601783,-80.193329),
			new google.maps.LatLng(32.585585,-80.211182),
			new google.maps.LatLng(32.593684,-80.221481),
			new google.maps.LatLng(32.615087,-80.227661),
			new google.maps.LatLng(32.622605,-80.255127),
			new google.maps.LatLng(32.648048,-80.250320),
			new google.maps.LatLng(32.651516,-80.236588),
			new google.maps.LatLng(32.670015,-80.226974),
			new google.maps.LatLng(32.678107,-80.208435),
			new google.maps.LatLng(32.692555,-80.208435),
			new google.maps.LatLng(32.695444,-80.201569),
			new google.maps.LatLng(32.700644,-80.201569),
			new google.maps.LatLng(32.700644,-80.191269),
			new google.maps.LatLng(32.706422,-80.180283),
			new google.maps.LatLng(32.706422,-80.156937),
			new google.maps.LatLng(32.707578,-80.143890),
			new google.maps.LatLng(32.719710,-80.165176),
			new google.maps.LatLng(32.731263,-80.169296),
			new google.maps.LatLng(32.732996,-80.169983),
			new google.maps.LatLng(32.742237,-80.163116),
			new google.maps.LatLng(32.749168,-80.156250),
			new google.maps.LatLng(32.749168,-80.139084),
			new google.maps.LatLng(32.756675,-80.131531),
			new google.maps.LatLng(32.771110,-80.130844),
			new google.maps.LatLng(32.780347,-80.120544),
			new google.maps.LatLng(32.785543,-80.106125),
			new google.maps.LatLng(32.783811,-80.096512),
			new google.maps.LatLng(32.778615,-80.091019),
			new google.maps.LatLng(32.776306,-80.078659),
			new google.maps.LatLng(32.769955,-80.073166),
			new google.maps.LatLng(32.767646,-80.067673),
			new google.maps.LatLng(32.774574,-80.049820),
			new google.maps.LatLng(32.772842,-80.042267),
			new google.maps.LatLng(32.771110,-80.034027),
			new google.maps.LatLng(32.766491,-80.025101)
			];

			// build the neighborhood polygon
			var neighborhoodPolygon_01;			
			neighborhoodPolygon_01 = new google.maps.Polygon({
			    paths: neighborhoodCoordinates_01,
			    strokeColor: "#737392",
			    strokeOpacity: 0.8,
			    strokeWeight: 2,
			    fillColor: "#737392",
			    fillOpacity: 0.35
			  });

			// call the neighborhood onto the map
			neighborhoodPolygon_01.setMap(map);

			// create the info window
			var contentString_01 = '<h4><i class=icon-home ></i> Johns Island</h4>'

			var infowindow = new InfoBubble({
			    content: contentString_01,
				maxWidth: 130,
				maxHeight: 100,
				padding: 5
			});

			var marker = new google.maps.Marker({
			    position: new google.maps.LatLng(32.673194,-80.04541),
			    map: map,
			    title: 'Johns Island'
			});

		  	infowindow.open(map,marker); // end johns island


			// sullivans island
		  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.766924,-79.864769),
			new google.maps.LatLng(32.764759,-79.865627),
			new google.maps.LatLng(32.763027,-79.863739),
			new google.maps.LatLng(32.758263,-79.859276),
			new google.maps.LatLng(32.754365,-79.853783),
			new google.maps.LatLng(32.753643,-79.848633),
			new google.maps.LatLng(32.754365,-79.843140),
			new google.maps.LatLng(32.759706,-79.835415),
			new google.maps.LatLng(32.761872,-79.831467),
			new google.maps.LatLng(32.763748,-79.823570),
			new google.maps.LatLng(32.763315,-79.822025),
			new google.maps.LatLng(32.771254,-79.814129),
			new google.maps.LatLng(32.774574,-79.812584),
			new google.maps.LatLng(32.774574,-79.810867),
			new google.maps.LatLng(32.777172,-79.812584),
			new google.maps.LatLng(32.773852,-79.819279),
			new google.maps.LatLng(32.771687,-79.824772),
			new google.maps.LatLng(32.767501,-79.835587),
			new google.maps.LatLng(32.764037,-79.841938),
			new google.maps.LatLng(32.761872,-79.848461),
			new google.maps.LatLng(32.760428,-79.850864),
			new google.maps.LatLng(32.762738,-79.857731),
			new google.maps.LatLng(32.764614,-79.860992)
			];
			// build the neighborhood polygon
			var neighborhoodPolygon_01;			
			neighborhoodPolygon_01 = new google.maps.Polygon({
			    paths: neighborhoodCoordinates_01,
			    strokeColor: "#737392",
			    strokeOpacity: 0.8,
			    strokeWeight: 2,
			    fillColor: "#737392",
			    fillOpacity: 0.35
			  });

			// call the neighborhood onto the map
			neighborhoodPolygon_01.setMap(map);

			// create the info window
			var contentString_01 = "<h4><i class=icon-home ></i> Sullivan's Island</h4>"

			var infowindow = new InfoBubble({
			    content: contentString_01,
				maxWidth: 130,
				maxHeight: 100,
				padding: 5
			});

			var marker = new google.maps.Marker({
			    position: new google.maps.LatLng(32.757541,-79.844355),
			    map: map,
			    title: 'Sullivans Island'
			});

		  	infowindow.open(map,marker); // end sullivans island
		
			// isle of palms
		  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.774430,-79.810867),
			new google.maps.LatLng(32.774718,-79.806061),
			new google.maps.LatLng(32.783089,-79.791298),
			new google.maps.LatLng(32.784533,-79.786663),
			new google.maps.LatLng(32.786986,-79.781685),
			new google.maps.LatLng(32.795644,-79.758854),
			new google.maps.LatLng(32.801416,-79.737568),
			new google.maps.LatLng(32.801416,-79.735165),
			new google.maps.LatLng(32.806178,-79.725895),
			new google.maps.LatLng(32.813103,-79.718685),
			new google.maps.LatLng(32.814546,-79.717827),
			new google.maps.LatLng(32.817575,-79.720402),
			new google.maps.LatLng(32.819162,-79.722805),
			new google.maps.LatLng(32.817142,-79.727955),
			new google.maps.LatLng(32.811083,-79.731560),
			new google.maps.LatLng(32.809352,-79.736881),
			new google.maps.LatLng(32.806610,-79.749241),
			new google.maps.LatLng(32.804879,-79.755592),
			new google.maps.LatLng(32.805023,-79.761600),
			new google.maps.LatLng(32.804879,-79.762974),
			new google.maps.LatLng(32.797953,-79.780312),
			new google.maps.LatLng(32.795500,-79.785976),
			new google.maps.LatLng(32.788862,-79.789925),
			new google.maps.LatLng(32.783089,-79.801083),
			new google.maps.LatLng(32.779337,-79.808464)
			];
			
			// build the neighborhood polygon
			var neighborhoodPolygon_01;			
			neighborhoodPolygon_01 = new google.maps.Polygon({
			    paths: neighborhoodCoordinates_01,
			    strokeColor: "#737392",
			    strokeOpacity: 0.8,
			    strokeWeight: 2,
			    fillColor: "#737392",
			    fillOpacity: 0.35
			  });

			// call the neighborhood onto the map
			neighborhoodPolygon_01.setMap(map);

			// create the info window
			var contentString_01 = "<h4><i class=icon-home ></i> Isle of Palms</h4>"

			var infowindow = new InfoBubble({
			    content: contentString_01,
				maxWidth: 130,
				maxHeight: 100,
				padding: 5
			});

			var marker = new google.maps.Marker({
			    position: new google.maps.LatLng(32.802138,-79.740341),
			    map: map,
			    title: 'Isle of Palms'
			});

		  	infowindow.open(map,marker); // end isle of palms

			// daniel island
		  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.861997,-79.937210),
			new google.maps.LatLng(32.855653,-79.932747),
			new google.maps.LatLng(32.853057,-79.927940),
			new google.maps.LatLng(32.844116,-79.924164),
			new google.maps.LatLng(32.836905,-79.925537),
			new google.maps.LatLng(32.833443,-79.925880),
			new google.maps.LatLng(32.827673,-79.925880),
			new google.maps.LatLng(32.822192,-79.923134),
			new google.maps.LatLng(32.819306,-79.918327),
			new google.maps.LatLng(32.819018,-79.913864),
			new google.maps.LatLng(32.827096,-79.902878),
			new google.maps.LatLng(32.832000,-79.899788),
			new google.maps.LatLng(32.837193,-79.898415),
			new google.maps.LatLng(32.842385,-79.899101),
			new google.maps.LatLng(32.844981,-79.900818),
			new google.maps.LatLng(32.856230,-79.900818),
			new google.maps.LatLng(32.859690,-79.901505),
			new google.maps.LatLng(32.865458,-79.892921),
			new google.maps.LatLng(32.870937,-79.893951),
			new google.maps.LatLng(32.875839,-79.893951),
			new google.maps.LatLng(32.871514,-79.889145),
			new google.maps.LatLng(32.871514,-79.884682),
			new google.maps.LatLng(32.871514,-79.879189),
			new google.maps.LatLng(32.881317,-79.876099),
			new google.maps.LatLng(32.885354,-79.879189),
			new google.maps.LatLng(32.897462,-79.882278),
			new google.maps.LatLng(32.900056,-79.888115),
			new google.maps.LatLng(32.895444,-79.893951),
			new google.maps.LatLng(32.899480,-79.896698),
			new google.maps.LatLng(32.896020,-79.908714),
			new google.maps.LatLng(32.889966,-79.905281),
			new google.maps.LatLng(32.889966,-79.910088),
			new google.maps.LatLng(32.884489,-79.917641),
			new google.maps.LatLng(32.878434,-79.916267),
			new google.maps.LatLng(32.876992,-79.922104),
			new google.maps.LatLng(32.872379,-79.932060),
			new google.maps.LatLng(32.866035,-79.939613)
			];
			
			// build the neighborhood polygon
			var neighborhoodPolygon_01;			
			neighborhoodPolygon_01 = new google.maps.Polygon({
			    paths: neighborhoodCoordinates_01,
			    strokeColor: "#737392",
			    strokeOpacity: 0.8,
			    strokeWeight: 2,
			    fillColor: "#737392",
			    fillOpacity: 0.35
			  });

			// call the neighborhood onto the map
			neighborhoodPolygon_01.setMap(map);

			// create the info window
			var contentString_01 = "<h4><i class=icon-home ></i> Daniel Island</h4>"

			var infowindow = new InfoBubble({
			    content: contentString_01,
				maxWidth: 200,
				maxHeight: 200,
				padding: 5
			});

			var marker = new google.maps.Marker({
			    position: new google.maps.LatLng(32.847505,-79.908592),
			    map: map,
			    title: 'Daniel Island'
			});

		  	infowindow.open(map,marker); // end daniel island



			// Mount PLeasant
		  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.812382,-79.906654),
			new google.maps.LatLng(32.807188,-79.903564),
			new google.maps.LatLng(32.795933,-79.906998),
			new google.maps.LatLng(32.791892,-79.907341),
			new google.maps.LatLng(32.786409,-79.906654),
			new google.maps.LatLng(32.784677,-79.904251),
			new google.maps.LatLng(32.788718,-79.887085),
			new google.maps.LatLng(32.792470,-79.881935),
			new google.maps.LatLng(32.785831,-79.879875),
			new google.maps.LatLng(32.784677,-79.877472),
			new google.maps.LatLng(32.772553,-79.860306),
			new google.maps.LatLng(32.773131,-79.856529),
			new google.maps.LatLng(32.777749,-79.851379),
			new google.maps.LatLng(32.815844,-79.795418),
			new google.maps.LatLng(32.851038,-79.764519),
			new google.maps.LatLng(32.872379,-79.738770),
			new google.maps.LatLng(32.886218,-79.722290),
			new google.maps.LatLng(32.916485,-79.757996),
			new google.maps.LatLng(32.918215,-79.770012),
			new google.maps.LatLng(32.925131,-79.779968),
			new google.maps.LatLng(32.928877,-79.787521),
			new google.maps.LatLng(32.926860,-79.791641),
			new google.maps.LatLng(32.925419,-79.812241),
			new google.maps.LatLng(32.918215,-79.817734),
			new google.maps.LatLng(32.924267,-79.830437),
			new google.maps.LatLng(32.908127,-79.835243),
			new google.maps.LatLng(32.881317,-79.843826),
			new google.maps.LatLng(32.873532,-79.837990),
			new google.maps.LatLng(32.875839,-79.845200),
			new google.maps.LatLng(32.872090,-79.850693),
			new google.maps.LatLng(32.866323,-79.857216),
			new google.maps.LatLng(32.862286,-79.870949),
			new google.maps.LatLng(32.863151,-79.880905),
			new google.maps.LatLng(32.856806,-79.894295),
			new google.maps.LatLng(32.849596,-79.892235),
			new google.maps.LatLng(32.847289,-79.888458),
			new google.maps.LatLng(32.840078,-79.885368),
			new google.maps.LatLng(32.838347,-79.889488),
			new google.maps.LatLng(32.829116,-79.892921),
			new google.maps.LatLng(32.825365,-79.891891),
			new google.maps.LatLng(32.824788,-79.894295),
			new google.maps.LatLng(32.818152,-79.901848)
			];
			
			// build the neighborhood polygon
			var neighborhoodPolygon_01;			
			neighborhoodPolygon_01 = new google.maps.Polygon({
			    paths: neighborhoodCoordinates_01,
			    strokeColor: "#737392",
			    strokeOpacity: 0.8,
			    strokeWeight: 2,
			    fillColor: "#737392",
			    fillOpacity: 0.35
			  });

			// call the neighborhood onto the map
			neighborhoodPolygon_01.setMap(map);

			// create the info window
			var contentString_01 = "<h4><i class=icon-home ></i> Mt Pleasant</h4>"

			var infowindow = new InfoBubble({
			    content: contentString_01,
				maxWidth: 130,
				maxHeight: 100,
				padding: 5
			});

			var marker = new google.maps.Marker({
			    position: new google.maps.LatLng(32.825365,-79.818528),
			    map: map,
			    title: 'Mt Pleasant'
			});

		  	infowindow.open(map,marker); // end mt pleasant

// ********** duty stations

// nuclear power school
	var dutyStationCoordinates = 
	[
	new google.maps.LatLng(32.967807,-79.969740),
	new google.maps.LatLng(32.967123,-79.970255),
	new google.maps.LatLng(32.967087,-79.972658),
	new google.maps.LatLng(32.966439,-79.974117),
	new google.maps.LatLng(32.965431,-79.974074),
	new google.maps.LatLng(32.965035,-79.973474),
	new google.maps.LatLng(32.964855,-79.972916),
	new google.maps.LatLng(32.965215,-79.971457),
	new google.maps.LatLng(32.964855,-79.970212),
	new google.maps.LatLng(32.964495,-79.970083),
	new google.maps.LatLng(32.964243,-79.969139),
	new google.maps.LatLng(32.964495,-79.968238),
	new google.maps.LatLng(32.963955,-79.967165),
	new google.maps.LatLng(32.963883,-79.965920),
	new google.maps.LatLng(32.965035,-79.964247),
	new google.maps.LatLng(32.965755,-79.964247),
	new google.maps.LatLng(32.966331,-79.964290),
	new google.maps.LatLng(32.967663,-79.964848),
	new google.maps.LatLng(32.968383,-79.965448),
	new google.maps.LatLng(32.968383,-79.966478),
	new google.maps.LatLng(32.967843,-79.967036),
	new google.maps.LatLng(32.967267,-79.967637),
	new google.maps.LatLng(32.967771,-79.968023),
	new google.maps.LatLng(32.967735,-79.968753),
	new google.maps.LatLng(32.967699,-79.969053),
	new google.maps.LatLng(32.967807,-79.969397)
	];

	var dutyStationPolygon;			
	dutyStationPolygon = new google.maps.Polygon({
		paths: dutyStationCoordinates,
		strokeColor: "red",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "red",
		fillOpacity: 0.35
	});

	// call the duty station onto the map
	dutyStationPolygon.setMap(map);

	// create content for an info bubble
	var contentString = '<h4><i class=icon-asterisk></i> Nuclear Power School</h4>'

	var infowindow = new InfoBubble({
		content: contentString,
		maxWidth: 125,
		maxHeight: 100,
		padding: 5
	});

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(32.965899,-79.966095),
		map: map,
		title: 'Nuclear Power School'
	});

	infowindow.open(map,marker); // end nuclear power school


// prototype
	var dutyStationCoordinates = 
	[
	new google.maps.LatLng(32.945950,-79.932060),
	new google.maps.LatLng(32.942078,-79.932296),
	new google.maps.LatLng(32.941052,-79.931717),
	new google.maps.LatLng(32.941934,-79.929442),
	new google.maps.LatLng(32.942276,-79.928842),
	new google.maps.LatLng(32.942330,-79.928069),
	new google.maps.LatLng(32.942708,-79.927661),
	new google.maps.LatLng(32.943050,-79.927597),
	new google.maps.LatLng(32.945968,-79.929013),
	new google.maps.LatLng(32.946382,-79.929335),
	new google.maps.LatLng(32.946562,-79.929872),
	new google.maps.LatLng(32.946328,-79.930344),
	new google.maps.LatLng(32.945932,-79.930365),
	new google.maps.LatLng(32.945481,-79.930623),
	new google.maps.LatLng(32.945031,-79.931245),
	new google.maps.LatLng(32.945679,-79.931803)
	];

	var dutyStationPolygon;			
	dutyStationPolygon = new google.maps.Polygon({
		paths: dutyStationCoordinates,
		strokeColor: "red",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "red",
		fillOpacity: 0.35
	});

	// call the duty station onto the map
	dutyStationPolygon.setMap(map);

	// create content for an info bubble
	var contentString = '<h4><i class=icon-asterisk></i> Prototype</h4>'

	var infowindow = new InfoBubble({
		content: contentString,
		maxWidth: 125,
		maxHeight: 100,
		padding: 5
	});

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(32.943618,-79.930796),
		map: map,
		title: 'Prototype'
	});

	infowindow.open(map,marker); // end prototype


	// joint base charleston
		var dutyStationCoordinates = 
		[
		new google.maps.LatLng(32.877425,-80.060120),
		new google.maps.LatLng(32.882903,-80.064411),
		new google.maps.LatLng(32.900777,-80.075569),
		new google.maps.LatLng(32.903083,-80.069389),
		new google.maps.LatLng(32.907839,-80.063038),
		new google.maps.LatLng(32.911297,-80.063038),
		new google.maps.LatLng(32.917926,-80.064411),
		new google.maps.LatLng(32.919800,-80.061150),
		new google.maps.LatLng(32.922249,-80.059261),
		new google.maps.LatLng(32.924987,-80.054798),
		new google.maps.LatLng(32.914756,-80.045872),
		new google.maps.LatLng(32.905533,-80.037117),
		new google.maps.LatLng(32.894579,-80.026646),
		new google.maps.LatLng(32.892849,-80.027676),
		new google.maps.LatLng(32.885642,-80.042953),
		new google.maps.LatLng(32.881461,-80.050850),
		new google.maps.LatLng(32.878290,-80.058060)
		];

		var dutyStationPolygon;			
		dutyStationPolygon = new google.maps.Polygon({
			paths: dutyStationCoordinates,
			strokeColor: "red",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "red",
			fillOpacity: 0.35
		});

		// call the duty station onto the map
		dutyStationPolygon.setMap(map);

		// create content for an info bubble
		var contentString = '<h4><i class=icon-asterisk></i> Joint Base Charleston</h4>'

		var infowindow = new InfoBubble({
			content: contentString,
			maxWidth: 125,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(32.895876,-80.041422),
			map: map,
			title: 'Joint Base Charleston'
		});

		infowindow.open(map,marker); // end joint base charleston


		// coast guard station
			var dutyStationCoordinates = 
			[
			new google.maps.LatLng(32.775160,-79.943637),
			new google.maps.LatLng(32.775242,-79.942253),
			new google.maps.LatLng(32.773464,-79.942017),
			new google.maps.LatLng(32.773311,-79.943079),
			new google.maps.LatLng(32.773248,-79.943250),
			new google.maps.LatLng(32.773906,-79.944248),
			new google.maps.LatLng(32.774502,-79.944463),
			new google.maps.LatLng(32.774619,-79.943680)
			];

			var dutyStationPolygon;			
			dutyStationPolygon = new google.maps.Polygon({
				paths: dutyStationCoordinates,
				strokeColor: "red",
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: "red",
				fillOpacity: 0.35
			});

			// call the duty station onto the map
			dutyStationPolygon.setMap(map);

			// create content for an info bubble
			var contentString = '<h4><i class=icon-asterisk></i> USCG</h4>'

			var infowindow = new InfoBubble({
				content: contentString,
				maxWidth: 125,
				maxHeight: 100,
				padding: 5
			});

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(32.774141,-79.943874),
				map: map,
				title: 'Coast Guard'
			});

			infowindow.open(map,marker); // end coast guard 


	//renderNeighborhoods(map);
	//renderDutyStations();

  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
	}; // remove all markers

	myArray = [];  
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location,
		places_id: place.id
      });
	      
	  markers.push(marker);
	  myArray.push(marker);
	
      bounds.extend(place.geometry.location);
    } // end for-loop to build markers onto the amap

    map.fitBounds(bounds);
	addSomeListeners(myArray);

  }); // end event listener for places_changed

  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

} // end initialize

function clearForm(form) {
  // iterate over all of the inputs for the form
  // element that was passed in
  $(':input', form).each(function() {
    var type = this.type;
    var tag = this.tagName.toLowerCase(); // normalize case
    // it's ok to reset the value attr of text inputs,
    // password inputs, and textareas
    if (type == 'text' || type == 'password' || tag == 'textarea')
      this.value = "";
    // checkboxes and radios need to have their checked state cleared
    // but should *not* have their 'value' changed
    else if (type == 'checkbox' || type == 'radio')
      this.checked = false;
    // select elements need to have their 'selectedIndex' property set to -1
    // (this works for both single and multiple select elements)
    else if (tag == 'select')
      this.selectedIndex = -1;
  });
};

function renderCommentForm(placeID, userID, placeName) {
	$("#putFormHere").html(
		'<form accept-charset="UTF-8" action="/posts" class="form-horizontal" id="new_post" method="post" data-remote="true"><input name="utf8" type="hidden" value="✓">' +
		$('#tokenTag').html() +
		'<div class="input-prepend"><span class="add-on"><i class="icon-comments"></i></span>' +
		'<input class="span9" id="post_body_from_map" name="post[body]" size="20" type="text" placeholder="Say something..." >' +
		'<input class="number_field" id="post_place_id" name="post[place_id]" type="hidden" value=' + placeID +'>' +
		'<input class="number_field" id="post_user_id" name="post[user_id]" type="hidden" value=' + userID +'>' +
		"<input class='text' id='post_tag_list' name='post[tag_list]' type='hidden' value=\"" + $("#postPlaceName").text() + "\">" +
		'<input class="btn btn-primary" name="commit" type="submit" value="Done">' +
		'</form>'
		);
	
	$('#new_post').submit(function(){
		$("#putCommentsHere").append(
			'<p>' + $("#postPlaceName").text() + ": " + $('input#post_body_from_map').val() + '</p>'
		)				
	});

}

function renderComments(post) {
	$("#putCommentsHere").append( 
		'<p><a href=/users/' + post.user.id +'><img width="30" src=' + post.user.profile_image +' /></a>' +
		post.body + '</p>'
	); // end append
	
}

function makeClickCallback(theArray, i) {  
   return function() {  
		// get all comments associated with the place
		$("#putPlaceHere").html(
			"<p id='postPlaceName'>" + theArray[i].title + "</p>"
			);
		// find or create the place and store the id of the place
		$.get("/places/?place=" + theArray[i].places_id + "&name=" + theArray[i].title,
			function(data) {
				womdittyPlaceID = data.id;
				womdittyPlaceName = data.name;
				currentUserID = $('#currentUserID').html();
				renderCommentForm(womdittyPlaceID, currentUserID, womdittyPlaceName);
			}, "json"); // end $.get
		$.get("/posts/?place=" + theArray[i].places_id,
			function(data) {
				$("#putCommentsHere").html("");
				for ( var j = 0; j < data.length; j++){
						renderComments(data[j]);
					}; // end for
				}, //end function(data)
				"json"); //end $.get
   };  // end return function
} // end makeClickCallback

function addSomeListeners(theArray){
	
	for (var i = 0; i < theArray.length; i++ ) {
      	var marker = new google.maps.Marker({
        	map: theArray[i].map,
        	icon: theArray[i].icon,
        	title: theArray[i].title,
        	position: theArray[i].position,
			places_id: theArray[i].places_id
      	});
		google.maps.event.addListener(marker, 'click', makeClickCallback(theArray, i) );
	} // end for-loop to add event listeners to each marker
	
} // end addSomeListeners

function getCensusData(){
	// charleston 13330
	// Goose Creek 29815
	// Hanahan 32065
	// isle of palms 36115
	// ladson 39220
	// Mount Pleasant 48535
	// North Charleston 50875
	// sullivans island 70090
	// Summerville 70270
	
	
	$.get('http://api.census.gov/data/2011/acs5?get=NAME,B19013_001E&for=place:39220,36115,70090,13330,32065,70270,50875,29815,48535&in=state:45&key=a7ec1f8dd060fc3ae0e08877c47f2fe2805dcba5',
		function(data){
			censusData = data;
			}, 'json');

}

function printCensusData(){

	for (var i = 1; i < censusData.length; i++){
		$('body').append(censusData[i]);
	}

}
;
var censusData;

function initialize() {

	var map = new google.maps.Map(document.getElementById('map-canvas'), {
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var defaultBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(32.801993,-80.085236), // lower left
		new google.maps.LatLng(32.92369,-79.833924)); // upper right
	map.fitBounds(defaultBounds);


  var input = /** @type {HTMLInputElement} */(document.getElementById('searchBoxTarget'));
  var searchBox = new google.maps.places.SearchBox(input);
  var markers = [];

		// hanahan
	  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.899480,-80.011711),
			new google.maps.LatLng(32.955961,-80.041752),
			new google.maps.LatLng(32.974828,-80.040722),
			new google.maps.LatLng(32.961866,-80.000725),
			new google.maps.LatLng(32.921529,-79.991455),
			new google.maps.LatLng(32.926140,-79.990940),
			new google.maps.LatLng(32.925996,-79.990253),
			new google.maps.LatLng(32.924699,-79.988708),
			new google.maps.LatLng(32.924843,-79.986305),
			new google.maps.LatLng(32.926572,-79.985962),
			new google.maps.LatLng(32.927869,-79.986477),
			new google.maps.LatLng(32.929454,-79.988194),
			new google.maps.LatLng(32.929454,-79.990597),
			new google.maps.LatLng(32.930895,-79.990940),
			new google.maps.LatLng(32.932479,-79.991455),
			new google.maps.LatLng(32.934641,-79.991627),
			new google.maps.LatLng(32.935937,-79.990082),
			new google.maps.LatLng(32.935793,-79.987679),
			new google.maps.LatLng(32.935649,-79.986649),
			new google.maps.LatLng(32.933488,-79.985790),
			new google.maps.LatLng(32.932047,-79.985447),
			new google.maps.LatLng(32.932768,-79.983387),
			new google.maps.LatLng(32.933488,-79.982014),
			new google.maps.LatLng(32.934064,-79.981327),
			new google.maps.LatLng(32.935505,-79.980640),
			new google.maps.LatLng(32.937522,-79.982357),
			new google.maps.LatLng(32.940403,-79.982014),
			new google.maps.LatLng(32.941268,-79.984417),
			new google.maps.LatLng(32.942276,-79.984417),
			new google.maps.LatLng(32.943429,-79.982700),
			new google.maps.LatLng(32.945301,-79.982529),
			new google.maps.LatLng(32.944581,-79.980297),
			new google.maps.LatLng(32.943717,-79.978065),
			new google.maps.LatLng(32.941412,-79.976521),
			new google.maps.LatLng(32.941412,-79.974461),
			new google.maps.LatLng(32.939107,-79.974804),
			new google.maps.LatLng(32.936946,-79.975147),
			new google.maps.LatLng(32.935361,-79.975319),
			new google.maps.LatLng(32.933344,-79.974632),
			new google.maps.LatLng(32.931903,-79.973087),
			new google.maps.LatLng(32.930606,-79.971027),
			new google.maps.LatLng(32.929886,-79.970684),
			new google.maps.LatLng(32.924987,-79.970684),
			new google.maps.LatLng(32.922105,-79.966393),
			new google.maps.LatLng(32.919656,-79.961414),
			new google.maps.LatLng(32.920088,-79.957981),
			new google.maps.LatLng(32.918070,-79.957809),
			new google.maps.LatLng(32.916629,-79.957809),
			new google.maps.LatLng(32.915621,-79.956093),
			new google.maps.LatLng(32.914036,-79.955578),
			new google.maps.LatLng(32.910000,-79.951973),
			new google.maps.LatLng(32.908127,-79.953003),
			new google.maps.LatLng(32.906398,-79.954720)
			];
			
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> Hanahan</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 130,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(32.934208,-80.008648 ),
		    map: map,
		    title: 'Hanahan'
		});

	  	infowindow.open(map,marker);

		// end hanahan

		// north charleston
	  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.824211,-79.953690),
			new google.maps.LatLng(32.828827,-79.964676),
			new google.maps.LatLng(32.834020,-79.968109),
			new google.maps.LatLng(32.834597,-79.976349),
			new google.maps.LatLng(32.835751,-79.989395),
			new google.maps.LatLng(32.831712,-79.999695),
			new google.maps.LatLng(32.828250,-80.011368),
			new google.maps.LatLng(32.829404,-80.018234),
			new google.maps.LatLng(32.846712,-80.039520),
			new google.maps.LatLng(32.846712,-80.047760),
			new google.maps.LatLng(32.870937,-80.069733),
			new google.maps.LatLng(32.873820,-80.078659),
			new google.maps.LatLng(32.881894,-80.081406),
			new google.maps.LatLng(32.898038,-80.112991),
			new google.maps.LatLng(32.940115,-80.164490),
			new google.maps.LatLng(32.977564,-80.114365),
			new google.maps.LatLng(32.983324,-80.095139),
			new google.maps.LatLng(32.996859,-80.058060),
			new google.maps.LatLng(32.990236,-80.054970),
			new google.maps.LatLng(32.985916,-80.047760),
			new google.maps.LatLng(32.980156,-80.044327),
			new google.maps.LatLng(32.963163,-80.044327),
			new google.maps.LatLng(32.938674,-80.039177),
			new google.maps.LatLng(32.898903,-80.016518),
			new google.maps.LatLng(32.902939,-79.974289),
			new google.maps.LatLng(32.900633,-79.961586),
			new google.maps.LatLng(32.898903,-79.958153),
			new google.maps.LatLng(32.887948,-79.962616),
			new google.maps.LatLng(32.878146,-79.961586),
			new google.maps.LatLng(32.879875,-79.965019),
			new google.maps.LatLng(32.872955,-79.963303),
			new google.maps.LatLng(32.867477,-79.960556),
			new google.maps.LatLng(32.859114,-79.955750),
			new google.maps.LatLng(32.853057,-79.939957),
			new google.maps.LatLng(32.847289,-79.931717),
			new google.maps.LatLng(32.842962,-79.932747),
			new google.maps.LatLng(32.834308,-79.933090),
			new google.maps.LatLng(32.828539,-79.933434),
			new google.maps.LatLng(32.830558,-79.940987),
			new google.maps.LatLng(32.823634,-79.951630)
			];
			
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> North Charleston</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 130,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(32.913459,-80.106495 ),
		    map: map,
		    title: 'North Charleston'
		});

	  	infowindow.open(map,marker);
		// end north charleston
		
		
		// goose creek
	  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.911297,-79.951630),
			new google.maps.LatLng(32.914756,-79.932404),
			new google.maps.LatLng(32.926860,-79.939270),
			new google.maps.LatLng(32.932623,-79.939957),
			new google.maps.LatLng(32.937810,-79.938583),
			new google.maps.LatLng(32.938963,-79.929657),
			new google.maps.LatLng(32.941268,-79.928284),
			new google.maps.LatLng(32.947606,-79.930344),
			new google.maps.LatLng(32.953944,-79.931030),
			new google.maps.LatLng(32.959706,-79.920731),
			new google.maps.LatLng(32.967771,-79.927597),
			new google.maps.LatLng(32.967771,-79.932060),
			new google.maps.LatLng(32.966331,-79.935493),
			new google.maps.LatLng(32.967483,-79.939613),
			new google.maps.LatLng(32.971804,-79.941330),
			new google.maps.LatLng(32.975548,-79.941330),
			new google.maps.LatLng(32.979580,-79.942360),
			new google.maps.LatLng(32.983612,-79.942017),
			new google.maps.LatLng(32.987644,-79.943390),
			new google.maps.LatLng(32.993691,-79.939613),
			new google.maps.LatLng(32.997722,-79.938927),
			new google.maps.LatLng(33.001178,-79.938927),
			new google.maps.LatLng(33.005209,-79.940643),
			new google.maps.LatLng(33.009239,-79.939270),
			new google.maps.LatLng(33.013558,-79.943390),
			new google.maps.LatLng(33.015573,-79.946480),
			new google.maps.LatLng(33.019891,-79.951286),
			new google.maps.LatLng(33.022770,-79.955406),
			new google.maps.LatLng(33.022194,-79.957123),
			new google.maps.LatLng(33.021618,-79.960213),
			new google.maps.LatLng(33.020755,-79.962616),
			new google.maps.LatLng(33.020179,-79.967766),
			new google.maps.LatLng(33.020179,-79.973259),
			new google.maps.LatLng(33.021043,-79.993515),
			new google.maps.LatLng(33.022194,-79.997635),
			new google.maps.LatLng(33.030542,-80.013428),
			new google.maps.LatLng(33.039176,-80.009995),
			new google.maps.LatLng(33.040903,-80.011368),
			new google.maps.LatLng(33.039752,-80.017204),
			new google.maps.LatLng(33.038313,-80.022697),
			new google.maps.LatLng(33.035147,-80.029564),
			new google.maps.LatLng(33.032844,-80.035057),
			new google.maps.LatLng(33.034859,-80.059433),
			new google.maps.LatLng(33.032269,-80.065613),
			new google.maps.LatLng(33.028527,-80.075226),
			new google.maps.LatLng(33.027088,-80.079002),
			new google.maps.LatLng(33.024209,-80.088959),
			new google.maps.LatLng(33.009239,-80.088272),
			new google.maps.LatLng(33.002905,-80.088615),
			new google.maps.LatLng(32.999738,-80.092049),
			new google.maps.LatLng(32.993115,-80.087242),
			new google.maps.LatLng(32.995995,-80.070419),
			new google.maps.LatLng(32.998298,-80.057373),
			new google.maps.LatLng(32.987932,-80.046387),
			new google.maps.LatLng(32.982172,-80.046043),
			new google.maps.LatLng(32.977852,-80.045013),
			new google.maps.LatLng(32.977276,-80.037117),
			new google.maps.LatLng(32.972380,-80.022011),
			new google.maps.LatLng(32.968923,-80.004845),
			new google.maps.LatLng(32.960570,-80.006561),
			new google.maps.LatLng(32.952504,-80.001755),
			new google.maps.LatLng(32.934064,-79.997292),
			new google.maps.LatLng(32.927148,-79.995575),
			new google.maps.LatLng(32.919656,-79.990425),
			new google.maps.LatLng(32.923114,-79.992485),
			new google.maps.LatLng(32.925131,-79.992485),
			new google.maps.LatLng(32.925996,-79.990082),
			new google.maps.LatLng(32.923690,-79.989395),
			new google.maps.LatLng(32.926860,-79.984932),
			new google.maps.LatLng(32.930030,-79.986305),
			new google.maps.LatLng(32.929742,-79.989395),
			new google.maps.LatLng(32.930606,-79.991455),
			new google.maps.LatLng(32.935505,-79.992142),
			new google.maps.LatLng(32.936081,-79.988365),
			new google.maps.LatLng(32.936081,-79.986305),
			new google.maps.LatLng(32.932912,-79.985275),
			new google.maps.LatLng(32.934064,-79.980125),
			new google.maps.LatLng(32.936369,-79.980812),
			new google.maps.LatLng(32.937522,-79.982185),
			new google.maps.LatLng(32.940691,-79.982185),
			new google.maps.LatLng(32.940980,-79.983902),
			new google.maps.LatLng(32.942996,-79.984245),
			new google.maps.LatLng(32.945301,-79.982872),
			new google.maps.LatLng(32.943861,-79.978065),
			new google.maps.LatLng(32.941556,-79.974632),
			new google.maps.LatLng(32.939539,-79.976006),
			new google.maps.LatLng(32.937810,-79.972572),
			new google.maps.LatLng(32.935217,-79.974289),
			new google.maps.LatLng(32.931759,-79.973946),
			new google.maps.LatLng(32.929166,-79.969826),
			new google.maps.LatLng(32.925996,-79.969482),
			new google.maps.LatLng(32.921961,-79.965363),
			new google.maps.LatLng(32.919656,-79.959869),
			new google.maps.LatLng(32.920808,-79.957809),
			new google.maps.LatLng(32.916197,-79.957123),
			new google.maps.LatLng(32.915044,-79.955750),
			new google.maps.LatLng(32.911586,-79.953346)			];
			
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> Goose Creek</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 130,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(33.010823,-80.033711 ),
		    map: map,
		    title: 'Goose Creek'
		});

	  	infowindow.open(map,marker); // end goose creek

		
		
		// west ashley
	  	var neighborhoodCoordinates_01 =
		[
		new google.maps.LatLng(32.775440,-79.956436),
		new google.maps.LatLng(32.789872,-79.972916),
		new google.maps.LatLng(32.798530,-79.976692),
		new google.maps.LatLng(32.819018,-79.968109),
		new google.maps.LatLng(32.829404,-79.977379),
		new google.maps.LatLng(32.830558,-79.986649),
		new google.maps.LatLng(32.829116,-80.001411),
		new google.maps.LatLng(32.826519,-80.004845),
		new google.maps.LatLng(32.823923,-80.009308),
		new google.maps.LatLng(32.824788,-80.017891),
		new google.maps.LatLng(32.828539,-80.021324),
		new google.maps.LatLng(32.831712,-80.022011),
		new google.maps.LatLng(32.839501,-80.034714),
		new google.maps.LatLng(32.845270,-80.039177),
		new google.maps.LatLng(32.845846,-80.049820),
		new google.maps.LatLng(32.840366,-80.061150),
		new google.maps.LatLng(32.821037,-80.089989),
		new google.maps.LatLng(32.812959,-80.103035),
		new google.maps.LatLng(32.798819,-80.104408),
		new google.maps.LatLng(32.785543,-80.059776),
		new google.maps.LatLng(32.782656,-80.025444),
		new google.maps.LatLng(32.777749,-79.999352),
		new google.maps.LatLng(32.775729,-79.962273)
		];
		
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> West Ashley</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 130,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(32.803148,-80.04232 ),
		    map: map,
		    title: 'West Ashley'
		});

	  	infowindow.open(map,marker); // end west ashley

		// summerville
	  	var neighborhoodCoordinates_01 =
		[
		new google.maps.LatLng(33.064500,-80.182343),
		new google.maps.LatLng(32.986204,-80.262680),
		new google.maps.LatLng(32.971804,-80.224228),
		new google.maps.LatLng(32.957401,-80.186462),
		new google.maps.LatLng(32.949335,-80.176163),
		new google.maps.LatLng(32.968347,-80.150757),
		new google.maps.LatLng(32.987932,-80.109558),
		new google.maps.LatLng(33.013846,-80.160370),
		new google.maps.LatLng(33.030542,-80.143204)
		];
		
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> Summerville</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 130,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(33.015573,-80.182396),
		    map: map,
		    title: 'Summerville'
		});

	  	infowindow.open(map,marker); // end summerville

		// downtown Charleston
	  	var neighborhoodCoordinates_01 =
		[
		new google.maps.LatLng(32.811804,-79.963646),
		new google.maps.LatLng(32.799252,-79.967594),
		new google.maps.LatLng(32.794346,-79.967937),
		new google.maps.LatLng(32.792037,-79.967766),
		new google.maps.LatLng(32.790882,-79.966221),
		new google.maps.LatLng(32.789728,-79.963646),
		new google.maps.LatLng(32.786409,-79.959526),
		new google.maps.LatLng(32.782079,-79.955406),
		new google.maps.LatLng(32.779337,-79.950600),
		new google.maps.LatLng(32.780636,-79.949226),
		new google.maps.LatLng(32.780636,-79.948025),
		new google.maps.LatLng(32.774285,-79.945450),
		new google.maps.LatLng(32.769955,-79.936695),
		new google.maps.LatLng(32.769522,-79.928799),
		new google.maps.LatLng(32.772842,-79.926910),
		new google.maps.LatLng(32.772986,-79.925537),
		new google.maps.LatLng(32.775007,-79.925365),
		new google.maps.LatLng(32.784965,-79.921932),
		new google.maps.LatLng(32.785543,-79.923992),
		new google.maps.LatLng(32.785976,-79.923992),
		new google.maps.LatLng(32.786409,-79.925194),
		new google.maps.LatLng(32.788140,-79.924679),
		new google.maps.LatLng(32.789295,-79.923477),
		new google.maps.LatLng(32.801128,-79.930000),
		new google.maps.LatLng(32.801272,-79.931374),
		new google.maps.LatLng(32.804446,-79.933777),
		new google.maps.LatLng(32.806466,-79.933434),
		new google.maps.LatLng(32.806466,-79.934978),
		new google.maps.LatLng(32.809496,-79.934978),
		new google.maps.LatLng(32.813680,-79.930687),
		new google.maps.LatLng(32.814834,-79.930859),
		new google.maps.LatLng(32.816998,-79.933434),
		new google.maps.LatLng(32.819162,-79.933777),
		new google.maps.LatLng(32.822336,-79.933949),
		new google.maps.LatLng(32.813103,-79.961758),
		new google.maps.LatLng(32.823923,-79.935150),
		new google.maps.LatLng(32.822624,-79.948540),
		new google.maps.LatLng(32.820460,-79.957809)
		];

		
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> Downtown Charleston</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 130,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(32.772842,-79.933804),
		    map: map,
		    title: 'Downtown Charleston'
		});

	  	infowindow.open(map,marker); // end downtown charleston


		// james island
	  	var neighborhoodCoordinates_01 =
		[
		new google.maps.LatLng(32.765336,-79.999695),
		new google.maps.LatLng(32.761872,-79.999695),
		new google.maps.LatLng(32.760717,-80.003128),
		new google.maps.LatLng(32.757541,-80.006218),
		new google.maps.LatLng(32.751189,-80.007935),
		new google.maps.LatLng(32.746858,-80.004845),
		new google.maps.LatLng(32.742237,-80.004845),
		new google.maps.LatLng(32.734440,-80.005531),
		new google.maps.LatLng(32.728086,-80.007248),
		new google.maps.LatLng(32.725776,-80.005188),
		new google.maps.LatLng(32.725487,-80.001755),
		new google.maps.LatLng(32.722021,-79.995575),
		new google.maps.LatLng(32.721154,-79.990768),
		new google.maps.LatLng(32.716822,-79.986305),
		new google.maps.LatLng(32.706711,-79.985962),
		new google.maps.LatLng(32.702089,-79.985962),
		new google.maps.LatLng(32.699489,-79.984245),
		new google.maps.LatLng(32.691399,-79.985619),
		new google.maps.LatLng(32.688509,-79.989395),
		new google.maps.LatLng(32.686776,-79.997978),
		new google.maps.LatLng(32.681574,-80.001411),
		new google.maps.LatLng(32.678107,-79.999008),
		new google.maps.LatLng(32.676373,-79.993515),
		new google.maps.LatLng(32.677240,-79.989738),
		new google.maps.LatLng(32.678107,-79.981155),
		new google.maps.LatLng(32.680418,-79.972916),
		new google.maps.LatLng(32.684753,-79.967079),
		new google.maps.LatLng(32.686487,-79.958839),
		new google.maps.LatLng(32.690821,-79.949570),
		new google.maps.LatLng(32.700933,-79.942360),
		new google.maps.LatLng(32.707578,-79.937553),
		new google.maps.LatLng(32.711044,-79.937897),
		new google.maps.LatLng(32.715089,-79.945107),
		new google.maps.LatLng(32.715955,-79.938583),
		new google.maps.LatLng(32.718844,-79.928284),
		new google.maps.LatLng(32.721154,-79.932060),
		new google.maps.LatLng(32.722599,-79.919014),
		new google.maps.LatLng(32.726065,-79.913864),
		new google.maps.LatLng(32.724909,-79.906654),
		new google.maps.LatLng(32.728086,-79.900131),
		new google.maps.LatLng(32.726353,-79.893951),
		new google.maps.LatLng(32.735307,-79.888802),
		new google.maps.LatLng(32.739638,-79.888115),
		new google.maps.LatLng(32.743681,-79.880219),
		new google.maps.LatLng(32.750900,-79.879875),
		new google.maps.LatLng(32.750900,-79.890175),
		new google.maps.LatLng(32.750034,-79.891548),
		new google.maps.LatLng(32.747724,-79.892921),
		new google.maps.LatLng(32.744547,-79.894638),
		new google.maps.LatLng(32.747435,-79.898071),
		new google.maps.LatLng(32.752633,-79.897728),
		new google.maps.LatLng(32.752633,-79.902534),
		new google.maps.LatLng(32.754654,-79.917297),
		new google.maps.LatLng(32.753210,-79.919357),
		new google.maps.LatLng(32.752055,-79.923820),
		new google.maps.LatLng(32.758696,-79.926224),
		new google.maps.LatLng(32.761872,-79.936867),
		new google.maps.LatLng(32.755520,-79.943047),
		new google.maps.LatLng(32.758118,-79.946823),
		new google.maps.LatLng(32.761006,-79.946823),
		new google.maps.LatLng(32.762160,-79.949226),
		new google.maps.LatLng(32.762738,-79.954033),
		new google.maps.LatLng(32.763315,-79.946136),
		new google.maps.LatLng(32.767068,-79.942360),
		new google.maps.LatLng(32.771976,-79.950600),
		new google.maps.LatLng(32.767646,-79.961586),
		new google.maps.LatLng(32.766202,-79.970512),
		new google.maps.LatLng(32.766202,-79.976349),
		new google.maps.LatLng(32.764470,-79.981155),
		new google.maps.LatLng(32.767068,-79.988022),
		new google.maps.LatLng(32.767646,-79.993858)
		];

		
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> James Island</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 130,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(32.726065,-79.96267),
		    map: map,
		    title: 'James Island'
		});

	  	infowindow.open(map,marker); // end james island

			// johns island
		  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.768223,-80.015488),
			new google.maps.LatLng(32.765336,-80.007935),
			new google.maps.LatLng(32.759562,-80.014114),
			new google.maps.LatLng(32.751478,-80.012054),
			new google.maps.LatLng(32.743392,-80.009995),
			new google.maps.LatLng(32.730686,-80.010681),
			new google.maps.LatLng(32.721443,-80.005875),
			new google.maps.LatLng(32.714511,-79.990768),
			new google.maps.LatLng(32.706422,-79.990082),
			new google.maps.LatLng(32.696600,-79.990082),
			new google.maps.LatLng(32.689665,-79.993515),
			new google.maps.LatLng(32.684464,-80.004501),
			new google.maps.LatLng(32.675795,-80.003815),
			new google.maps.LatLng(32.665969,-80.001755),
			new google.maps.LatLng(32.656141,-80.014114),
			new google.maps.LatLng(32.643422,-80.020294),
			new google.maps.LatLng(32.638797,-80.051193),
			new google.maps.LatLng(32.620870,-80.084839),
			new google.maps.LatLng(32.619135,-80.107498),
			new google.maps.LatLng(32.619714,-80.124664),
			new google.maps.LatLng(32.612195,-80.151443),
			new google.maps.LatLng(32.606989,-80.170670),
			new google.maps.LatLng(32.598891,-80.180969),
			new google.maps.LatLng(32.601783,-80.193329),
			new google.maps.LatLng(32.585585,-80.211182),
			new google.maps.LatLng(32.593684,-80.221481),
			new google.maps.LatLng(32.615087,-80.227661),
			new google.maps.LatLng(32.622605,-80.255127),
			new google.maps.LatLng(32.648048,-80.250320),
			new google.maps.LatLng(32.651516,-80.236588),
			new google.maps.LatLng(32.670015,-80.226974),
			new google.maps.LatLng(32.678107,-80.208435),
			new google.maps.LatLng(32.692555,-80.208435),
			new google.maps.LatLng(32.695444,-80.201569),
			new google.maps.LatLng(32.700644,-80.201569),
			new google.maps.LatLng(32.700644,-80.191269),
			new google.maps.LatLng(32.706422,-80.180283),
			new google.maps.LatLng(32.706422,-80.156937),
			new google.maps.LatLng(32.707578,-80.143890),
			new google.maps.LatLng(32.719710,-80.165176),
			new google.maps.LatLng(32.731263,-80.169296),
			new google.maps.LatLng(32.732996,-80.169983),
			new google.maps.LatLng(32.742237,-80.163116),
			new google.maps.LatLng(32.749168,-80.156250),
			new google.maps.LatLng(32.749168,-80.139084),
			new google.maps.LatLng(32.756675,-80.131531),
			new google.maps.LatLng(32.771110,-80.130844),
			new google.maps.LatLng(32.780347,-80.120544),
			new google.maps.LatLng(32.785543,-80.106125),
			new google.maps.LatLng(32.783811,-80.096512),
			new google.maps.LatLng(32.778615,-80.091019),
			new google.maps.LatLng(32.776306,-80.078659),
			new google.maps.LatLng(32.769955,-80.073166),
			new google.maps.LatLng(32.767646,-80.067673),
			new google.maps.LatLng(32.774574,-80.049820),
			new google.maps.LatLng(32.772842,-80.042267),
			new google.maps.LatLng(32.771110,-80.034027),
			new google.maps.LatLng(32.766491,-80.025101)
			];

			// build the neighborhood polygon
			var neighborhoodPolygon_01;			
			neighborhoodPolygon_01 = new google.maps.Polygon({
			    paths: neighborhoodCoordinates_01,
			    strokeColor: "#737392",
			    strokeOpacity: 0.8,
			    strokeWeight: 2,
			    fillColor: "#737392",
			    fillOpacity: 0.35
			  });

			// call the neighborhood onto the map
			neighborhoodPolygon_01.setMap(map);

			// create the info window
			var contentString_01 = '<h4><i class=icon-home ></i> Johns Island</h4>'

			var infowindow = new InfoBubble({
			    content: contentString_01,
				maxWidth: 130,
				maxHeight: 100,
				padding: 5
			});

			var marker = new google.maps.Marker({
			    position: new google.maps.LatLng(32.673194,-80.04541),
			    map: map,
			    title: 'Johns Island'
			});

		  	infowindow.open(map,marker); // end johns island


			// sullivans island
		  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.766924,-79.864769),
			new google.maps.LatLng(32.764759,-79.865627),
			new google.maps.LatLng(32.763027,-79.863739),
			new google.maps.LatLng(32.758263,-79.859276),
			new google.maps.LatLng(32.754365,-79.853783),
			new google.maps.LatLng(32.753643,-79.848633),
			new google.maps.LatLng(32.754365,-79.843140),
			new google.maps.LatLng(32.759706,-79.835415),
			new google.maps.LatLng(32.761872,-79.831467),
			new google.maps.LatLng(32.763748,-79.823570),
			new google.maps.LatLng(32.763315,-79.822025),
			new google.maps.LatLng(32.771254,-79.814129),
			new google.maps.LatLng(32.774574,-79.812584),
			new google.maps.LatLng(32.774574,-79.810867),
			new google.maps.LatLng(32.777172,-79.812584),
			new google.maps.LatLng(32.773852,-79.819279),
			new google.maps.LatLng(32.771687,-79.824772),
			new google.maps.LatLng(32.767501,-79.835587),
			new google.maps.LatLng(32.764037,-79.841938),
			new google.maps.LatLng(32.761872,-79.848461),
			new google.maps.LatLng(32.760428,-79.850864),
			new google.maps.LatLng(32.762738,-79.857731),
			new google.maps.LatLng(32.764614,-79.860992)
			];
			// build the neighborhood polygon
			var neighborhoodPolygon_01;			
			neighborhoodPolygon_01 = new google.maps.Polygon({
			    paths: neighborhoodCoordinates_01,
			    strokeColor: "#737392",
			    strokeOpacity: 0.8,
			    strokeWeight: 2,
			    fillColor: "#737392",
			    fillOpacity: 0.35
			  });

			// call the neighborhood onto the map
			neighborhoodPolygon_01.setMap(map);

			// create the info window
			var contentString_01 = "<h4><i class=icon-home ></i> Sullivan's Island</h4>"

			var infowindow = new InfoBubble({
			    content: contentString_01,
				maxWidth: 130,
				maxHeight: 100,
				padding: 5
			});

			var marker = new google.maps.Marker({
			    position: new google.maps.LatLng(32.757541,-79.844355),
			    map: map,
			    title: 'Sullivans Island'
			});

		  	infowindow.open(map,marker); // end sullivans island
		
			// isle of palms
		  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.774430,-79.810867),
			new google.maps.LatLng(32.774718,-79.806061),
			new google.maps.LatLng(32.783089,-79.791298),
			new google.maps.LatLng(32.784533,-79.786663),
			new google.maps.LatLng(32.786986,-79.781685),
			new google.maps.LatLng(32.795644,-79.758854),
			new google.maps.LatLng(32.801416,-79.737568),
			new google.maps.LatLng(32.801416,-79.735165),
			new google.maps.LatLng(32.806178,-79.725895),
			new google.maps.LatLng(32.813103,-79.718685),
			new google.maps.LatLng(32.814546,-79.717827),
			new google.maps.LatLng(32.817575,-79.720402),
			new google.maps.LatLng(32.819162,-79.722805),
			new google.maps.LatLng(32.817142,-79.727955),
			new google.maps.LatLng(32.811083,-79.731560),
			new google.maps.LatLng(32.809352,-79.736881),
			new google.maps.LatLng(32.806610,-79.749241),
			new google.maps.LatLng(32.804879,-79.755592),
			new google.maps.LatLng(32.805023,-79.761600),
			new google.maps.LatLng(32.804879,-79.762974),
			new google.maps.LatLng(32.797953,-79.780312),
			new google.maps.LatLng(32.795500,-79.785976),
			new google.maps.LatLng(32.788862,-79.789925),
			new google.maps.LatLng(32.783089,-79.801083),
			new google.maps.LatLng(32.779337,-79.808464)
			];
			
			// build the neighborhood polygon
			var neighborhoodPolygon_01;			
			neighborhoodPolygon_01 = new google.maps.Polygon({
			    paths: neighborhoodCoordinates_01,
			    strokeColor: "#737392",
			    strokeOpacity: 0.8,
			    strokeWeight: 2,
			    fillColor: "#737392",
			    fillOpacity: 0.35
			  });

			// call the neighborhood onto the map
			neighborhoodPolygon_01.setMap(map);

			// create the info window
			var contentString_01 = "<h4><i class=icon-home ></i> Isle of Palms</h4>"

			var infowindow = new InfoBubble({
			    content: contentString_01,
				maxWidth: 130,
				maxHeight: 100,
				padding: 5
			});

			var marker = new google.maps.Marker({
			    position: new google.maps.LatLng(32.802138,-79.740341),
			    map: map,
			    title: 'Isle of Palms'
			});

		  	infowindow.open(map,marker); // end isle of palms

			// daniel island
		  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.861997,-79.937210),
			new google.maps.LatLng(32.855653,-79.932747),
			new google.maps.LatLng(32.853057,-79.927940),
			new google.maps.LatLng(32.844116,-79.924164),
			new google.maps.LatLng(32.836905,-79.925537),
			new google.maps.LatLng(32.833443,-79.925880),
			new google.maps.LatLng(32.827673,-79.925880),
			new google.maps.LatLng(32.822192,-79.923134),
			new google.maps.LatLng(32.819306,-79.918327),
			new google.maps.LatLng(32.819018,-79.913864),
			new google.maps.LatLng(32.827096,-79.902878),
			new google.maps.LatLng(32.832000,-79.899788),
			new google.maps.LatLng(32.837193,-79.898415),
			new google.maps.LatLng(32.842385,-79.899101),
			new google.maps.LatLng(32.844981,-79.900818),
			new google.maps.LatLng(32.856230,-79.900818),
			new google.maps.LatLng(32.859690,-79.901505),
			new google.maps.LatLng(32.865458,-79.892921),
			new google.maps.LatLng(32.870937,-79.893951),
			new google.maps.LatLng(32.875839,-79.893951),
			new google.maps.LatLng(32.871514,-79.889145),
			new google.maps.LatLng(32.871514,-79.884682),
			new google.maps.LatLng(32.871514,-79.879189),
			new google.maps.LatLng(32.881317,-79.876099),
			new google.maps.LatLng(32.885354,-79.879189),
			new google.maps.LatLng(32.897462,-79.882278),
			new google.maps.LatLng(32.900056,-79.888115),
			new google.maps.LatLng(32.895444,-79.893951),
			new google.maps.LatLng(32.899480,-79.896698),
			new google.maps.LatLng(32.896020,-79.908714),
			new google.maps.LatLng(32.889966,-79.905281),
			new google.maps.LatLng(32.889966,-79.910088),
			new google.maps.LatLng(32.884489,-79.917641),
			new google.maps.LatLng(32.878434,-79.916267),
			new google.maps.LatLng(32.876992,-79.922104),
			new google.maps.LatLng(32.872379,-79.932060),
			new google.maps.LatLng(32.866035,-79.939613)
			];
			
			// build the neighborhood polygon
			var neighborhoodPolygon_01;			
			neighborhoodPolygon_01 = new google.maps.Polygon({
			    paths: neighborhoodCoordinates_01,
			    strokeColor: "#737392",
			    strokeOpacity: 0.8,
			    strokeWeight: 2,
			    fillColor: "#737392",
			    fillOpacity: 0.35
			  });

			// call the neighborhood onto the map
			neighborhoodPolygon_01.setMap(map);

			// create the info window
			var contentString_01 = "<h4><i class=icon-home ></i> Daniel Island</h4>"

			var infowindow = new InfoBubble({
			    content: contentString_01,
				maxWidth: 130,
				maxHeight: 100,
				padding: 5
			});

			var marker = new google.maps.Marker({
			    position: new google.maps.LatLng(32.847505,-79.908592),
			    map: map,
			    title: 'Daniel Island'
			});

		  	infowindow.open(map,marker); // end daniel island



			// Mount PLeasant
		  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.812382,-79.906654),
			new google.maps.LatLng(32.807188,-79.903564),
			new google.maps.LatLng(32.795933,-79.906998),
			new google.maps.LatLng(32.791892,-79.907341),
			new google.maps.LatLng(32.786409,-79.906654),
			new google.maps.LatLng(32.784677,-79.904251),
			new google.maps.LatLng(32.788718,-79.887085),
			new google.maps.LatLng(32.792470,-79.881935),
			new google.maps.LatLng(32.785831,-79.879875),
			new google.maps.LatLng(32.784677,-79.877472),
			new google.maps.LatLng(32.772553,-79.860306),
			new google.maps.LatLng(32.773131,-79.856529),
			new google.maps.LatLng(32.777749,-79.851379),
			new google.maps.LatLng(32.815844,-79.795418),
			new google.maps.LatLng(32.851038,-79.764519),
			new google.maps.LatLng(32.872379,-79.738770),
			new google.maps.LatLng(32.886218,-79.722290),
			new google.maps.LatLng(32.916485,-79.757996),
			new google.maps.LatLng(32.918215,-79.770012),
			new google.maps.LatLng(32.925131,-79.779968),
			new google.maps.LatLng(32.928877,-79.787521),
			new google.maps.LatLng(32.926860,-79.791641),
			new google.maps.LatLng(32.925419,-79.812241),
			new google.maps.LatLng(32.918215,-79.817734),
			new google.maps.LatLng(32.924267,-79.830437),
			new google.maps.LatLng(32.908127,-79.835243),
			new google.maps.LatLng(32.881317,-79.843826),
			new google.maps.LatLng(32.873532,-79.837990),
			new google.maps.LatLng(32.875839,-79.845200),
			new google.maps.LatLng(32.872090,-79.850693),
			new google.maps.LatLng(32.866323,-79.857216),
			new google.maps.LatLng(32.862286,-79.870949),
			new google.maps.LatLng(32.863151,-79.880905),
			new google.maps.LatLng(32.856806,-79.894295),
			new google.maps.LatLng(32.849596,-79.892235),
			new google.maps.LatLng(32.847289,-79.888458),
			new google.maps.LatLng(32.840078,-79.885368),
			new google.maps.LatLng(32.838347,-79.889488),
			new google.maps.LatLng(32.829116,-79.892921),
			new google.maps.LatLng(32.825365,-79.891891),
			new google.maps.LatLng(32.824788,-79.894295),
			new google.maps.LatLng(32.818152,-79.901848)
			];
			
			// build the neighborhood polygon
			var neighborhoodPolygon_01;			
			neighborhoodPolygon_01 = new google.maps.Polygon({
			    paths: neighborhoodCoordinates_01,
			    strokeColor: "#737392",
			    strokeOpacity: 0.8,
			    strokeWeight: 2,
			    fillColor: "#737392",
			    fillOpacity: 0.35
			  });

			// call the neighborhood onto the map
			neighborhoodPolygon_01.setMap(map);

			// create the info window
			var contentString_01 = "<h4><i class=icon-home ></i> Mt Pleasant</h4>"

			var infowindow = new InfoBubble({
			    content: contentString_01,
				maxWidth: 130,
				maxHeight: 100,
				padding: 5
			});

			var marker = new google.maps.Marker({
			    position: new google.maps.LatLng(32.825365,-79.818528),
			    map: map,
			    title: 'Mt Pleasant'
			});

		  	infowindow.open(map,marker); // end mt pleasant

// ********** duty stations

// nuclear power school
	var dutyStationCoordinates = 
	[
	new google.maps.LatLng(32.967807,-79.969740),
	new google.maps.LatLng(32.967123,-79.970255),
	new google.maps.LatLng(32.967087,-79.972658),
	new google.maps.LatLng(32.966439,-79.974117),
	new google.maps.LatLng(32.965431,-79.974074),
	new google.maps.LatLng(32.965035,-79.973474),
	new google.maps.LatLng(32.964855,-79.972916),
	new google.maps.LatLng(32.965215,-79.971457),
	new google.maps.LatLng(32.964855,-79.970212),
	new google.maps.LatLng(32.964495,-79.970083),
	new google.maps.LatLng(32.964243,-79.969139),
	new google.maps.LatLng(32.964495,-79.968238),
	new google.maps.LatLng(32.963955,-79.967165),
	new google.maps.LatLng(32.963883,-79.965920),
	new google.maps.LatLng(32.965035,-79.964247),
	new google.maps.LatLng(32.965755,-79.964247),
	new google.maps.LatLng(32.966331,-79.964290),
	new google.maps.LatLng(32.967663,-79.964848),
	new google.maps.LatLng(32.968383,-79.965448),
	new google.maps.LatLng(32.968383,-79.966478),
	new google.maps.LatLng(32.967843,-79.967036),
	new google.maps.LatLng(32.967267,-79.967637),
	new google.maps.LatLng(32.967771,-79.968023),
	new google.maps.LatLng(32.967735,-79.968753),
	new google.maps.LatLng(32.967699,-79.969053),
	new google.maps.LatLng(32.967807,-79.969397)
	];

	var dutyStationPolygon;			
	dutyStationPolygon = new google.maps.Polygon({
		paths: dutyStationCoordinates,
		strokeColor: "red",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "red",
		fillOpacity: 0.35
	});

	// call the duty station onto the map
	dutyStationPolygon.setMap(map);

	// create content for an info bubble
	var contentString = '<h4><i class=icon-asterisk></i> Nuclear Power School</h4>'

	var infowindow = new InfoBubble({
		content: contentString,
		maxWidth: 125,
		maxHeight: 100,
		padding: 5
	});

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(32.965899,-79.966095),
		map: map,
		title: 'Nuclear Power School'
	});

	infowindow.open(map,marker); // end nuclear power school


// prototype
	var dutyStationCoordinates = 
	[
	new google.maps.LatLng(32.945950,-79.932060),
	new google.maps.LatLng(32.942078,-79.932296),
	new google.maps.LatLng(32.941052,-79.931717),
	new google.maps.LatLng(32.941934,-79.929442),
	new google.maps.LatLng(32.942276,-79.928842),
	new google.maps.LatLng(32.942330,-79.928069),
	new google.maps.LatLng(32.942708,-79.927661),
	new google.maps.LatLng(32.943050,-79.927597),
	new google.maps.LatLng(32.945968,-79.929013),
	new google.maps.LatLng(32.946382,-79.929335),
	new google.maps.LatLng(32.946562,-79.929872),
	new google.maps.LatLng(32.946328,-79.930344),
	new google.maps.LatLng(32.945932,-79.930365),
	new google.maps.LatLng(32.945481,-79.930623),
	new google.maps.LatLng(32.945031,-79.931245),
	new google.maps.LatLng(32.945679,-79.931803)
	];

	var dutyStationPolygon;			
	dutyStationPolygon = new google.maps.Polygon({
		paths: dutyStationCoordinates,
		strokeColor: "red",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "red",
		fillOpacity: 0.35
	});

	// call the duty station onto the map
	dutyStationPolygon.setMap(map);

	// create content for an info bubble
	var contentString = '<h4><i class=icon-asterisk></i> Prototype</h4>'

	var infowindow = new InfoBubble({
		content: contentString,
		maxWidth: 125,
		maxHeight: 100,
		padding: 5
	});

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(32.943618,-79.930796),
		map: map,
		title: 'Prototype'
	});

	infowindow.open(map,marker); // end prototype


	// joint base charleston
		var dutyStationCoordinates = 
		[
		new google.maps.LatLng(32.877425,-80.060120),
		new google.maps.LatLng(32.882903,-80.064411),
		new google.maps.LatLng(32.900777,-80.075569),
		new google.maps.LatLng(32.903083,-80.069389),
		new google.maps.LatLng(32.907839,-80.063038),
		new google.maps.LatLng(32.911297,-80.063038),
		new google.maps.LatLng(32.917926,-80.064411),
		new google.maps.LatLng(32.919800,-80.061150),
		new google.maps.LatLng(32.922249,-80.059261),
		new google.maps.LatLng(32.924987,-80.054798),
		new google.maps.LatLng(32.914756,-80.045872),
		new google.maps.LatLng(32.905533,-80.037117),
		new google.maps.LatLng(32.894579,-80.026646),
		new google.maps.LatLng(32.892849,-80.027676),
		new google.maps.LatLng(32.885642,-80.042953),
		new google.maps.LatLng(32.881461,-80.050850),
		new google.maps.LatLng(32.878290,-80.058060)
		];

		var dutyStationPolygon;			
		dutyStationPolygon = new google.maps.Polygon({
			paths: dutyStationCoordinates,
			strokeColor: "red",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "red",
			fillOpacity: 0.35
		});

		// call the duty station onto the map
		dutyStationPolygon.setMap(map);

		// create content for an info bubble
		var contentString = '<h4><i class=icon-asterisk></i> Joint Base Charleston</h4>'

		var infowindow = new InfoBubble({
			content: contentString,
			maxWidth: 125,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(32.895876,-80.041422),
			map: map,
			title: 'Joint Base Charleston'
		});

		infowindow.open(map,marker); // end joint base charleston


		// coast guard station
			var dutyStationCoordinates = 
			[
			new google.maps.LatLng(32.775160,-79.943637),
			new google.maps.LatLng(32.775242,-79.942253),
			new google.maps.LatLng(32.773464,-79.942017),
			new google.maps.LatLng(32.773311,-79.943079),
			new google.maps.LatLng(32.773248,-79.943250),
			new google.maps.LatLng(32.773906,-79.944248),
			new google.maps.LatLng(32.774502,-79.944463),
			new google.maps.LatLng(32.774619,-79.943680)
			];

			var dutyStationPolygon;			
			dutyStationPolygon = new google.maps.Polygon({
				paths: dutyStationCoordinates,
				strokeColor: "red",
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: "red",
				fillOpacity: 0.35
			});

			// call the duty station onto the map
			dutyStationPolygon.setMap(map);

			// create content for an info bubble
			var contentString = '<h4><i class=icon-asterisk></i> USCG</h4>'

			var infowindow = new InfoBubble({
				content: contentString,
				maxWidth: 125,
				maxHeight: 100,
				padding: 5
			});

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(32.774141,-79.943874),
				map: map,
				title: 'Coast Guard'
			});

			infowindow.open(map,marker); // end coast guard 


	//renderNeighborhoods(map);
	//renderDutyStations();

  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
	}; // remove all markers

	myArray = [];  
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location,
		places_id: place.id
      });
	      
	  markers.push(marker);
	  myArray.push(marker);
	
      bounds.extend(place.geometry.location);
    } // end for-loop to build markers onto the amap

    map.fitBounds(bounds);
	addSomeListeners(myArray);

  }); // end event listener for places_changed

  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

} // end initialize

function clearForm(form) {
  // iterate over all of the inputs for the form
  // element that was passed in
  $(':input', form).each(function() {
    var type = this.type;
    var tag = this.tagName.toLowerCase(); // normalize case
    // it's ok to reset the value attr of text inputs,
    // password inputs, and textareas
    if (type == 'text' || type == 'password' || tag == 'textarea')
      this.value = "";
    // checkboxes and radios need to have their checked state cleared
    // but should *not* have their 'value' changed
    else if (type == 'checkbox' || type == 'radio')
      this.checked = false;
    // select elements need to have their 'selectedIndex' property set to -1
    // (this works for both single and multiple select elements)
    else if (tag == 'select')
      this.selectedIndex = -1;
  });
};

function renderCommentForm(placeID, userID, placeName) {
	$("#putFormHere").html(
		'<form accept-charset="UTF-8" action="/posts" class="form-horizontal" id="new_post" method="post" data-remote="true"><input name="utf8" type="hidden" value="✓">' +
		$('#tokenTag').html() +
		'<div class="input-prepend"><span class="add-on"><i class="icon-comments"></i></span>' +
		'<input class="span9" id="post_body_from_map" name="post[body]" size="20" type="text" placeholder="Say something..." >' +
		'<input class="number_field" id="post_place_id" name="post[place_id]" type="hidden" value=' + placeID +'>' +
		'<input class="number_field" id="post_user_id" name="post[user_id]" type="hidden" value=' + userID +'>' +
		"<input class='text' id='post_tag_list' name='post[tag_list]' type='hidden' value=\"" + $("#postPlaceName").text() + "\">" +
		'<input class="btn btn-primary" name="commit" type="submit" value="Done">' +
		'</form>'
		);
	
	$('#new_post').submit(function(){
		$("#putCommentsHere").append(
			'<p>' + $("#postPlaceName").text() + ": " + $('input#post_body_from_map').val() + '</p>'
		)				
	});

}

function renderComments(post) {
	$("#putCommentsHere").append( 
		'<p><a href=/users/' + post.user.id +'><img width="30" src=' + post.user.profile_image +' /></a>' +
		post.body + '</p>'
	); // end append
	
}

function makeClickCallback(theArray, i) {  
   return function() {  
		// get all comments associated with the place
		$("#putPlaceHere").html(
			"<p id='postPlaceName'>" + theArray[i].title + "</p>"
			);
		// find or create the place and store the id of the place
		$.get("/places/?place=" + theArray[i].places_id + "&name=" + theArray[i].title,
			function(data) {
				womdittyPlaceID = data.id;
				womdittyPlaceName = data.name;
				currentUserID = $('#currentUserID').html();
				renderCommentForm(womdittyPlaceID, currentUserID, womdittyPlaceName);
			}, "json"); // end $.get
		$.get("/posts/?place=" + theArray[i].places_id,
			function(data) {
				$("#putCommentsHere").html("");
				for ( var j = 0; j < data.length; j++){
						renderComments(data[j]);
					}; // end for
				}, //end function(data)
				"json"); //end $.get
   };  // end return function
} // end makeClickCallback

function addSomeListeners(theArray){
	
	for (var i = 0; i < theArray.length; i++ ) {
      	var marker = new google.maps.Marker({
        	map: theArray[i].map,
        	icon: theArray[i].icon,
        	title: theArray[i].title,
        	position: theArray[i].position,
			places_id: theArray[i].places_id
      	});
		google.maps.event.addListener(marker, 'click', makeClickCallback(theArray, i) );
	} // end for-loop to add event listeners to each marker
	
} // end addSomeListeners

function getCensusData(){
	// charleston 13330
	// Goose Creek 29815
	// Hanahan 32065
	// isle of palms 36115
	// ladson 39220
	// Mount Pleasant 48535
	// North Charleston 50875
	// sullivans island 70090
	// Summerville 70270
	
	
	$.get('http://api.census.gov/data/2011/acs5?get=NAME,B19013_001E&for=place:39220,36115,70090,13330,32065,70270,50875,29815,48535&in=state:45&key=a7ec1f8dd060fc3ae0e08877c47f2fe2805dcba5',
		function(data){
			censusData = data;
			}, 'json');

}

function printCensusData(){

	for (var i = 1; i < censusData.length; i++){
		$('body').append(censusData[i]);
	}

}
;
(function() {
  $(document).ready(function() {
    return $("#posts").infinitescroll({
      navSelector: "nav.pagination",
      nextSelector: "nav.pagination a[rel=next]",
      itemSelector: "#posts tr.post"
    });
  });

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.7.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]',

    // Button elements boud jquery-ujs
    buttonClickSelector: 'button[data-remote]',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with], button[data-disable-with], textarea[data-disable-with]',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            return rails.fire(element, 'ajax:beforeSend', [xhr, settings]);
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        var jqxhr = rails.ajax(options);
        element.trigger('ajax:send', jqxhr);
        return jqxhr;
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrf_token = $('meta[name=csrf-token]').attr('content'),
        csrf_param = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrf_param !== undefined && csrf_token !== undefined) {
        metadata_input += '<input name="' + csrf_param + '" value="' + csrf_token + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadata_input).appendTo('body');
      form.submit();
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      form.find(rails.disableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        element.data('ujs:enable-with', element[method]());
        element[method](element.data('disable-with'));
        element.prop('disabled', true);
      });
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      form.find(rails.enableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
        element.prop('disabled', false);
      });
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      element.data('ujs:enable-with', element.html()); // store enabled state
      element.html(element.data('disable-with')); // set to disabled state
      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }

  };

  if (rails.fire($(document), 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $(document).delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $(document).delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params');
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if ( (e.metaKey || e.ctrlKey) && (!method || method === 'GET') && !data ) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $(document).delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);
      if (!rails.allowAction(button)) return rails.stopEverything(e);

      rails.handleRemote(button);
      return false;
    });

    $(document).delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $(document).delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector),
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (blankRequiredInputs && form.attr("novalidate") == undefined && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
        return rails.stopEverything(e);
      }

      if (remote) {
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $(document).delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $(document).delegate(rails.formSubmitSelector, 'ajax:beforeSend.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $(document).delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      // making sure that all forms have actual up-to-date token(cached forms contain old one)
      var csrf_token = $('meta[name=csrf-token]').attr('content');
      var csrf_param = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrf_param + '"]').val(csrf_token);
    });
  }

})( jQuery );
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//




;
