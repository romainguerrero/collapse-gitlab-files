// ==UserScript==
// @name         Collapse all gitlab diffs
// @namespace    https://github.com/romainguerrero/collapse-gitlab-files
// @version      0.2
// @description  Collapses all files on a GitLab merge request diff page
// @author       Romain Guerrero
// @grant        https://github.com/johanbrandhorst/collapse-gitlab-files
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @include      https://gitlab.com/*/merge_requests/*
// @include      https://gitlab.com/*/commit/*
// @include      https://*.githost.io/*/merge_requests/*
// @include      https://*.githost.io/*/commit/*
// ==/UserScript==
//
// Script based on script suggested by Pantelis Geo
// (https://gitlab.com/pantelis.geo.90)
// in https://gitlab.com/gitlab-org/gitlab-ce/issues/24679
// and StackOverflow answer
// http://stackoverflow.com/questions/6480082/add-a-javascript-button-using-greasemonkey-or-tampermonkey
// and forked from Johan Brandhorst reposotiry
// https://github.com/johanbrandhorst/collapse-gitlab-files
//
// Warning:
// Depends on GitLab supplying jQuery.

waitForKeyElements (".inline-parallel-buttons", function() {
    'use strict';

    var button = document.createElement ('button');
    button.setAttribute ('id', 'collapse-button');
    button.setAttribute ('class', 'btn btn-default');
    button.setAttribute ('type', 'button');
    button.textContent = "Collapse All";
    var buttons = document.getElementsByClassName ("inline-parallel-buttons")[0];
    buttons.insertBefore (button, buttons.firstChild);

    //--- Activate button.
    document.getElementById ("collapse-button").addEventListener(
        "click", CollapseAll, false
    );

    function CollapseAll (zEvent) {
        $(".diff-file").find("div.nothing-here-block").each(function (i){
            if (!$(this).is(":visible")){
                $(this).parents("div.file-holder").find("div.file-title-flex-parent").trigger("click");
            }
        });
    }
});

waitForKeyElements (".issuable-context-form", function() {
    'use strict';

    var sidebarCollapseButton = document.createElement ('button');
    sidebarCollapseButton.setAttribute ('id', 'sidebar-collapse-button');
    sidebarCollapseButton.setAttribute ('class', 'btn btn-default hide-collapsed');
    sidebarCollapseButton.setAttribute ('type', 'button');
    sidebarCollapseButton.textContent = "Collapse All";
    var sidebarExpandButton = document.createElement ('button');
    sidebarExpandButton.setAttribute ('id', 'sidebar-expand-button');
    sidebarExpandButton.setAttribute ('class', 'btn btn-default hide-collapsed');
    sidebarExpandButton.setAttribute ('type', 'button');
    sidebarExpandButton.textContent = "Expand All";
    var sidebarDiv = document.createElement ('div');
    sidebarDiv.setAttribute ('class', 'block light div-collapse-button btn-group');
    sidebarDiv.appendChild (sidebarCollapseButton);
    sidebarDiv.appendChild (sidebarExpandButton);
    var sidebarContents = document.getElementsByClassName ("issuable-context-form")[0];
    sidebarContents.appendChild (sidebarDiv);

    //--- Activate button.
    document.getElementById ("sidebar-collapse-button").addEventListener(
        "click", CollapseAll, false
    );

    function CollapseAll (zEvent) {
        $(".diff-file").find("div.nothing-here-block").each(function (i){
            if (!$(this).is(":visible")){
                $(this).parents("div.file-holder").find("div.file-title-flex-parent").trigger("click");
            }
        });
    }

    //--- Activate button.
    document.getElementById ("sidebar-expand-button").addEventListener(
        "click", ExpandAll, false
    );

    function ExpandAll (zEvent) {
        $(".diff-file").find("div.nothing-here-block").each(function (i){
            if ($(this).is(":visible")){
                $(this).parents("div.file-holder").find("div.file-title-flex-parent").trigger("click");
            }
        });
    }
});
