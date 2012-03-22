/* See license.txt for terms of usage */

define([
    "lib/trace",
],
function(FBTrace) { with (Domplate) {

// ********************************************************************************************* //
// Graph Generator

/**
 * Returns graph as a tree of owners and edges for specified object.
 */
function ObjectGraphGenerator(searchId)
{
    this.searchId = searchId;
}

ObjectGraphGenerator.prototype =
{
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Graph

    findGraph: function(o)
    {
        if (!o)
            return null;

        this.counter = 0;

        var res = {};
        this.getObjectGraph(o, o.address, res);
        return res;
    },

    getObjectGraph: function(o, name, res)
    {
        if (o._searchMark == this.searchId)
            return;

        o._searchMark = this.searchId;

        var obj = new ObjectGraphGenerator.Object(o);
        obj.name = o.name;
        res[this.ensureUniqueName(res, name)] = obj;

        // Just counting number of objects in the sub-graph
        this.counter++;

        for (var i=0; i<o.owners.length; i++)
        {
            var owner = o.owners[i];
            this.getObjectGraph(owner.from, owner.name ? owner.name : "<unknown-owner>", obj);
        }

        for (var i=0; i<o.edges.length; i++)
        {
            var edge = o.edges[i];
            this.getObjectGraph(edge.to, edge.name ? edge.name : "<unknown-edge>", obj);
        }
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Helpers

    ensureUniqueName: function(obj, name)
    {
        var newName = name;
        var counter = 0;
        while (obj[newName])
            newName = name + " {" + (++counter) + "}";
        return newName;
    }
}

ObjectGraphGenerator.Object = function(obj)
{
    // A private member, ObjectTree template doesn't display those.
    this._o = obj;
}

// ********************************************************************************************* //

return ObjectGraphGenerator;

// ********************************************************************************************* //
}});
