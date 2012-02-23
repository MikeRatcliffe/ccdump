/* See license.txt for terms of usage */

define([
    "lib/domplate",
    "lib/lib",
    "lib/trace",
    "lib/tabView",
    "objectTree",
    "objectGraphGenerator"
],

function(Domplate, Lib, FBTrace, TabView, ObjectTree, ObjectGraphGenerator) {
with (Domplate) {

// ********************************************************************************************* //
// Home Tab

function DetailsTab() {}
DetailsTab.prototype = Lib.extend(TabView.Tab.prototype,
{
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Tab

    id: "Details",
    label: "Details",

    bodyTag:
        DIV({"class": "DetailsBody"}),

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Content

    noSelection:
        SPAN("No object selected"),

    onUpdateBody: function(tabView, body)
    {
        var selection = tabView.selection;
        if (!selection)
        {
            this.noSelection.replace({}, body);
            return;
        }

        var tree = new ObjectTree(selection);
        tree.append(body, true);
    },
});

// ********************************************************************************************* //

return DetailsTab;

// ********************************************************************************************* //
}});
