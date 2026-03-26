/**
 * TSTS Design System — CSM Finder Component
 *
 * Displays Community Safety Managers on a Leaflet map with GeoJSON
 * coverage areas, searchable list view, and full accessibility support
 * including a no-map fallback.
 *
 * Dependencies:
 *   - Leaflet CSS + JS (loaded via CDN in the template)
 *
 * Data contract (Eleventy _data/people.js or people.json):
 *   Each person object should include:
 *   {
 *     name:       "Jane Smith",
 *     role:       "Community Safety Manager",
 *     area:       "Kent",
 *     email:      "jane.smith@networkrail.co.uk",
 *     phone:      "07700 900123",
 *     photo:      "/assets/img/people/jane-smith.jpg",  // optional
 *     lat:        51.27,
 *     lng:        0.52,
 *     coverage:   { … }   // GeoJSON FeatureCollection or Feature
 *   }
 *
 * Usage:
 *   <div id="csm-finder" data-csm-finder></div>
 *
 *   In your Eleventy template, output the people data as JSON into a
 *   script tag so this JS can read it:
 *
 *   <script id="csm-data" type="application/json">
 *     {{ people | dump | safe }}
 *   </script>
 *   <script src="/assets/js/csm-finder.js"></script>
 */

(function () {
  "use strict";

  /* -------------------------------------------------------------------
     CONFIG
     ------------------------------------------------------------------- */
  var CONFIG = {
    // Leaflet tile provider (free, no API key)
    tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    tileAttribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

    // Map defaults (UK centroid)
    defaultCenter: [52.5, -1.5],
    defaultZoom: 6,
    maxZoom: 16,
    minZoom: 5,

    // Coverage area styling
    coverageStyle: {
      color: "#073552",
      weight: 2,
      opacity: 0.7,
      fillColor: "#E8BD48",
      fillOpacity: 0.15,
    },
    coverageHoverStyle: {
      weight: 3,
      fillOpacity: 0.3,
    },

    // Marker styling
    markerColor: "#073552",
    markerActiveColor: "#E8BD48",
  };

  /* -------------------------------------------------------------------
     HELPERS
     ------------------------------------------------------------------- */
  function qs(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }
  function qsa(sel, ctx) {
    return Array.prototype.slice.call(
      (ctx || document).querySelectorAll(sel)
    );
  }
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "className") node.className = attrs[k];
        else if (k === "textContent") node.textContent = attrs[k];
        else if (k === "innerHTML") node.innerHTML = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach(function (c) {
        if (typeof c === "string") node.appendChild(document.createTextNode(c));
        else if (c) node.appendChild(c);
      });
    }
    return node;
  }

  function debounce(fn, ms) {
    var t;
    return function () {
      var ctx = this,
        args = arguments;
      clearTimeout(t);
      t = setTimeout(function () {
        fn.apply(ctx, args);
      }, ms);
    };
  }

  function getInitials(name) {
    return name
      .split(" ")
      .map(function (w) {
        return w[0];
      })
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  /* -------------------------------------------------------------------
     ICONS (inline SVGs)
     ------------------------------------------------------------------- */
  var ICONS = {
    search:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
    email:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    phone:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  };

  /* -------------------------------------------------------------------
     BUILD PERSON CARD HTML
     ------------------------------------------------------------------- */
  function buildCardHTML(person, opts) {
    opts = opts || {};
    var compact = opts.compact;
    var cls = "c-csm-card" + (compact ? " c-csm-card--popup" : "");

    var avatarHTML;
    if (person.photo) {
      avatarHTML =
        '<img class="c-csm-card__avatar" src="' +
        person.photo +
        '" alt="" loading="lazy">';
    } else {
      avatarHTML =
        '<span class="c-csm-card__avatar c-csm-card__avatar--placeholder" aria-hidden="true">' +
        getInitials(person.name) +
        "</span>";
    }

    var contactLinks = "";
    if (person.email) {
      contactLinks +=
        '<a class="c-csm-card__contact-link" href="mailto:' +
        person.email +
        '">' +
        '<span class="c-csm-card__contact-icon">' +
        ICONS.email +
        "</span>" +
        person.email +
        "</a>";
    }
    if (person.phone) {
      contactLinks +=
        '<a class="c-csm-card__contact-link" href="tel:' +
        person.phone.replace(/\s/g, "") +
        '">' +
        '<span class="c-csm-card__contact-icon">' +
        ICONS.phone +
        "</span>" +
        person.phone +
        "</a>";
    }

    return (
      '<div class="' + cls + '">' +
      avatarHTML +
      '<div class="c-csm-card__body">' +
      '<div class="c-csm-card__name">' + person.name + "</div>" +
      '<div class="c-csm-card__role">' +
      (person.role || "Community Safety Manager") +
      "</div>" +
      (person.area
        ? '<span class="c-csm-card__area">' +
          '<span class="c-csm-card__contact-icon">' +
          ICONS.pin +
          "</span>" +
          person.area +
          "</span>"
        : "") +
      (contactLinks
        ? '<div class="c-csm-card__contact">' + contactLinks + "</div>"
        : "") +
      "</div></div>"
    );
  }

  /* -------------------------------------------------------------------
     CREATE CUSTOM MARKER
     ------------------------------------------------------------------- */
  function createMarkerIcon(active) {
    if (typeof L === "undefined") return null;
    var color = active ? CONFIG.markerActiveColor : CONFIG.markerColor;
    return L.divIcon({
      className: "c-csm-finder__marker",
      html:
        '<svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="' +
        color +
        '"/>' +
        '<circle cx="14" cy="13" r="5" fill="#fff"/>' +
        "</svg>",
      iconSize: [28, 36],
      iconAnchor: [14, 36],
      popupAnchor: [0, -36],
    });
  }

  /* -------------------------------------------------------------------
     MAIN INIT
     ------------------------------------------------------------------- */
  function init() {
    var root = qs("[data-csm-finder]");
    if (!root) return;

    // ---- Read data ----
    var dataEl = qs("#csm-data");
    var people = [];
    if (dataEl) {
      try {
        var parsed = JSON.parse(dataEl.textContent);
        // Support both array and object with csm array
        people = Array.isArray(parsed) ? parsed : parsed.csm || parsed.people || [];
        // Filter to CSMs only if there are mixed roles
        people = people.filter(function (p) {
          return (
            !p.role ||
            p.role.toLowerCase().indexOf("community safety") !== -1 ||
            p.role.toLowerCase().indexOf("csm") !== -1
          );
        });
      } catch (e) {
        console.error("CSM Finder: Could not parse people data", e);
      }
    }

    // ---- State ----
    var state = {
      view: "map", // 'map' | 'list'
      query: "",
      filtered: people.slice(),
      map: null,
      markers: [],
      coverageLayers: [],
    };

    // ---- Check if Leaflet is available ----
    var hasLeaflet = typeof L !== "undefined";

    // ---- Build DOM ----
    root.className = "c-csm-finder";
    root.innerHTML = "";

    // Controls
    var controls = el("div", { className: "c-csm-finder__controls" });

    // Search
    var searchWrap = el("div", { className: "c-csm-finder__search" });
    var searchIcon = el("span", {
      className: "c-csm-finder__search-icon",
      innerHTML: ICONS.search,
      "aria-hidden": "true",
    });
    var searchInput = el("input", {
      className: "c-csm-finder__search-input",
      type: "search",
      placeholder: "Search by name or area\u2026",
      "aria-label": "Search community safety managers",
    });
    searchWrap.appendChild(searchIcon);
    searchWrap.appendChild(searchInput);

    // View toggle
    var viewToggle = el("div", {
      className: "c-csm-finder__view-toggle",
      role: "group",
      "aria-label": "View mode",
    });

    var mapBtn = el("button", {
      className: "c-csm-finder__view-btn",
      "aria-pressed": "true",
      "data-view": "map",
      innerHTML:
        '<span class="c-csm-finder__view-btn-icon">' +
        ICONS.map +
        "</span>Map",
    });

    var listBtn = el("button", {
      className: "c-csm-finder__view-btn",
      "aria-pressed": "false",
      "data-view": "list",
      innerHTML:
        '<span class="c-csm-finder__view-btn-icon">' +
        ICONS.list +
        "</span>List",
    });

    viewToggle.appendChild(mapBtn);
    viewToggle.appendChild(listBtn);

    controls.appendChild(searchWrap);
    controls.appendChild(viewToggle);

    // Status (live region)
    var statusEl = el("div", {
      className: "c-csm-finder__status",
      "aria-live": "polite",
      "aria-atomic": "true",
    });

    // Map container
    var mapContainer = el("div", {
      className: "c-csm-finder__map c-csm-finder__map--loading",
      role: "application",
      "aria-label":
        "Interactive map showing community safety manager locations and coverage areas",
      tabindex: "-1",
    });

    // List container
    var listContainer = el("ul", {
      className: "c-csm-finder__list",
      role: "list",
      "aria-label": "Community safety managers",
      hidden: "hidden",
    });

    // Empty state
    var emptyEl = el("div", { className: "c-csm-finder__empty" });
    emptyEl.innerHTML =
      '<div class="c-csm-finder__empty-icon" aria-hidden="true">\uD83D\uDD0D</div>' +
      "<p>No community safety managers found matching your search.</p>";
    emptyEl.hidden = true;

    root.appendChild(controls);
    root.appendChild(statusEl);
    root.appendChild(mapContainer);
    root.appendChild(listContainer);
    root.appendChild(emptyEl);

    // If Leaflet is not available, fall back to list view
    if (!hasLeaflet) {
      state.view = "list";
      mapBtn.disabled = true;
      mapBtn.setAttribute("aria-pressed", "false");
      mapBtn.title =
        "Map view requires JavaScript and Leaflet to be available";
      listBtn.setAttribute("aria-pressed", "true");
      mapContainer.hidden = true;
      listContainer.hidden = false;
    }

    // ---- Render Functions ----

    function updateStatus() {
      var count = state.filtered.length;
      var total = people.length;
      if (state.query) {
        statusEl.textContent =
          "Showing " +
          count +
          " of " +
          total +
          ' community safety manager' +
          (total !== 1 ? 's' : '') +
          ' for \u201C' +
          state.query +
          '\u201D';
      } else {
        statusEl.textContent =
          count +
          " community safety manager" +
          (count !== 1 ? "s" : "");
      }
    }

    function renderList() {
      listContainer.innerHTML = "";
      emptyEl.hidden = state.filtered.length > 0;

      state.filtered.forEach(function (person) {
        var li = el("li");
        li.innerHTML = buildCardHTML(person);

        // Click to focus on map
        if (state.view === "list" || !hasLeaflet) {
          // No extra click behaviour needed in pure list mode
        }

        listContainer.appendChild(li);
      });
    }

    function renderMap() {
      if (!hasLeaflet || !state.map) return;

      // Remove existing markers & layers
      state.markers.forEach(function (m) {
        state.map.removeLayer(m);
      });
      state.coverageLayers.forEach(function (l) {
        state.map.removeLayer(l);
      });
      state.markers = [];
      state.coverageLayers = [];

      var bounds = [];

      state.filtered.forEach(function (person) {
        if (!person.lat || !person.lng) return;

        // Coverage area
        if (person.coverage) {
          try {
            var coverageLayer = L.geoJSON(person.coverage, {
              style: function () {
                return Object.assign({}, CONFIG.coverageStyle);
              },
              onEachFeature: function (feature, layer) {
                layer.on("mouseover", function () {
                  layer.setStyle(CONFIG.coverageHoverStyle);
                });
                layer.on("mouseout", function () {
                  layer.setStyle(CONFIG.coverageStyle);
                });

                // Bind popup to coverage area too
                layer.bindPopup(buildCardHTML(person, { compact: true }), {
                  maxWidth: 300,
                  className: "c-csm-finder__popup",
                });
              },
            });
            coverageLayer.addTo(state.map);
            state.coverageLayers.push(coverageLayer);

            // Use coverage bounds for fitting
            try {
              var layerBounds = coverageLayer.getBounds();
              if (layerBounds.isValid()) {
                bounds.push(layerBounds);
              }
            } catch (e) {
              // fallback to marker point
            }
          } catch (e) {
            console.warn("CSM Finder: Invalid GeoJSON for " + person.name, e);
          }
        }

        // Marker
        var marker = L.marker([person.lat, person.lng], {
          icon: createMarkerIcon(false),
          title: person.name + " — " + (person.area || ""),
          alt: person.name + ", " + (person.role || "Community Safety Manager"),
        });

        marker.bindPopup(buildCardHTML(person, { compact: true }), {
          maxWidth: 300,
          className: "c-csm-finder__popup",
        });

        marker.on("popupopen", function () {
          marker.setIcon(createMarkerIcon(true));
        });
        marker.on("popupclose", function () {
          marker.setIcon(createMarkerIcon(false));
        });

        marker.addTo(state.map);
        state.markers.push(marker);

        if (!person.coverage) {
          bounds.push(L.latLng(person.lat, person.lng));
        }
      });

      // Fit bounds
      if (bounds.length > 0) {
        try {
          var group = L.featureGroup(
            bounds.map(function (b) {
              if (b.getBounds) return L.rectangle(b.getBounds());
              return L.marker(b);
            })
          );
          state.map.fitBounds(group.getBounds().pad(0.1));
        } catch (e) {
          state.map.setView(CONFIG.defaultCenter, CONFIG.defaultZoom);
        }
      } else {
        state.map.setView(CONFIG.defaultCenter, CONFIG.defaultZoom);
      }

      mapContainer.classList.remove("c-csm-finder__map--loading");
    }

    function setView(view) {
      state.view = view;

      if (view === "map" && hasLeaflet) {
        mapContainer.hidden = false;
        listContainer.hidden = true;
        mapBtn.setAttribute("aria-pressed", "true");
        listBtn.setAttribute("aria-pressed", "false");

        // Leaflet needs a nudge when container becomes visible
        setTimeout(function () {
          if (state.map) state.map.invalidateSize();
        }, 100);
      } else {
        mapContainer.hidden = true;
        listContainer.hidden = false;
        mapBtn.setAttribute("aria-pressed", "false");
        listBtn.setAttribute("aria-pressed", "true");
      }
    }

    function filterPeople() {
      var q = state.query.toLowerCase().trim();
      if (!q) {
        state.filtered = people.slice();
      } else {
        state.filtered = people.filter(function (p) {
          return (
            (p.name && p.name.toLowerCase().indexOf(q) !== -1) ||
            (p.area && p.area.toLowerCase().indexOf(q) !== -1) ||
            (p.role && p.role.toLowerCase().indexOf(q) !== -1)
          );
        });
      }
      updateStatus();
      renderList();
      renderMap();
    }

    // ---- Event Listeners ----

    searchInput.addEventListener(
      "input",
      debounce(function () {
        state.query = searchInput.value;
        filterPeople();
      }, 250)
    );

    mapBtn.addEventListener("click", function () {
      setView("map");
    });

    listBtn.addEventListener("click", function () {
      setView("list");
    });

    // ---- Initialise Map ----
    if (hasLeaflet) {
      state.map = L.map(mapContainer, {
        center: CONFIG.defaultCenter,
        zoom: CONFIG.defaultZoom,
        maxZoom: CONFIG.maxZoom,
        minZoom: CONFIG.minZoom,
        scrollWheelZoom: false,
        // Accessibility: allow keyboard control
        keyboard: true,
        zoomControl: true,
      });

      L.tileLayer(CONFIG.tileUrl, {
        attribution: CONFIG.tileAttribution,
        maxZoom: CONFIG.maxZoom,
      }).addTo(state.map);

      // Enable scroll zoom only after click (prevents accidental zoom)
      state.map.on("click", function () {
        state.map.scrollWheelZoom.enable();
      });
      state.map.on("mouseout", function () {
        state.map.scrollWheelZoom.disable();
      });
    }

    // ---- Initial Render ----
    filterPeople();
    if (!hasLeaflet) {
      setView("list");
    }
  }

  // ---- Boot ----
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
