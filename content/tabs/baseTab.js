/* See license.txt for terms of usage */

define([
    "lib/domplate",
    "lib/lib",
    "lib/trace",
    "lib/tabView",
    "lib/toolbar",
    "lib/options",
    "tabs/search",
],

function(Domplate, Lib, FBTrace, TabView, Toolbar, Options, Search) {
with (Domplate) {

// ********************************************************************************************* //
// Home Tab

function BaseTab()
{
}

BaseTab.prototype = Lib.extend(TabView.Tab.prototype,
{
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Tab

    bodyTag:
        DIV({"class": ""},
            DIV({"class": "tabToolbar"}),
            DIV({"class": "tabContent"})
        ),

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Content

    onUpdateBody: function(tabView, body)
    {
        this.toolbar = new Toolbar();

        // Initialize toolbar.
        this.toolbar.addButtons(this.getToolbarButtons());
        this.toolbar.render(body.querySelector(".tabToolbar"));
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Toolbar

    getToolbarButtons: function()
    {
        var buttons = [];

        buttons.push({
            id: "search",
            tag: Search.Box.tag,
            initialize: Search.Box.initialize
        });

        return buttons;
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Search

    onSearch: function(text, keyCode)
    {
    },

    getSearchOptions: function()
    {
        var items = [];

        items.push({
            label: "Case Sensitive",
            checked: Options.getPref("search.caseSensitive"),
            command: Lib.bindFixed(this.onOption, this, "search.caseSensitive")
        });
        items.push({
            label: "Table Layout",
            checked: Options.getPref("search.tableLayout"),
            command: Lib.bindFixed(this.onOption, this, "search.tableLayout")
        });

        return items;
    },

    onOption: function(name)
    {
        Options.tooglePref(name);
    },
});

// ********************************************************************************************* //

return BaseTab;

// ********************************************************************************************* //
}});
