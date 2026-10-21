/* Freddes Mat – liten, beroendefri JS. Sidan fungerar utan den. */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  /* Header: skugga vid scroll */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      var limit = document.body.classList.contains("home") ? 80 : 8;
      header.classList.toggle("is-scrolled", window.scrollY > limit);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Mobilmeny */
  var toggle = document.querySelector(".menu-toggle");
  var mobileMenu = document.getElementById("mobilmeny");
  if (toggle && mobileMenu) {
    var setOpen = function (open) {
      if (open && header) {
        root.style.setProperty("--menu-top", Math.max(0, header.getBoundingClientRect().bottom) + "px");
      }
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.querySelector(".menu-toggle__label").textContent = open ? "Stäng" : "Meny";
      mobileMenu.inert = !open;
    };
    mobileMenu.inert = true;
    toggle.addEventListener("click", function () {
      setOpen(!document.body.classList.contains("menu-open"));
    });
    mobileMenu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 981px)").addEventListener("change", function (m) {
      if (m.matches) setOpen(false);
    });
  }

  /* Veckans lunch: markera dagens rätter (datum anges i data-date, ÅÅÅÅ-MM-DD) */
  var now = new Date();
  var pad = function (n) {
    return (n < 10 ? "0" : "") + n;
  };
  var today = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());
  document.querySelectorAll(".day[data-date]").forEach(function (day) {
    if (day.getAttribute("data-date") === today) day.classList.add("is-today");
  });

  /* Startsidans hero: kort med dagens lunch (hämtas från veckomenyn längre ned) */
  var card = document.querySelector(".stage-card");
  if (card) {
    var closed = false;
    try {
      closed = sessionStorage.getItem("fm-card-closed") === "1";
    } catch (e) {}
    var todayEl = document.querySelector(".day.is-today");
    var list = card.querySelector("[data-card-dishes]");
    var weekTitle = document.querySelector(".lunch__title .display");
    if (todayEl) {
      card.querySelector("[data-card-kicker]").textContent =
        "Idag · " + todayEl.querySelector("h3").textContent + " " + todayEl.querySelector(".day__date").textContent;
      todayEl.querySelectorAll(".dish > span:last-child").forEach(function (d) {
        var li = document.createElement("li");
        li.textContent = d.textContent;
        list.appendChild(li);
      });
    } else {
      card.querySelector("[data-card-kicker]").textContent = "Veckans lunch";
      card.querySelector("[data-card-title]").textContent = weekTitle ? weekTitle.textContent : "Veckans lunch";
      list.remove();
    }
    if (!closed) card.hidden = false;
    card.querySelector(".stage-card__close").addEventListener("click", function () {
      card.hidden = true;
      try {
        sessionStorage.setItem("fm-card-closed", "1");
      } catch (e) {}
    });
  }

  /* Inrörelser */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  /* Cateringmenyn: markera aktiv kategori i den klistrade menyraden */
  var menuLinks = document.querySelectorAll(".menu-nav a[href^='#']");
  if (menuLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    menuLinks.forEach(function (a) {
      byId[a.getAttribute("href").slice(1)] = a;
    });
    var current = null;
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var link = byId[entry.target.id];
          if (!link || link === current) return;
          if (current) current.classList.remove("is-active");
          link.classList.add("is-active");
          current = link;
          var bar = link.parentElement.parentElement;
          bar.scrollTo({ left: link.offsetLeft - 24, behavior: "smooth" });
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  /* Offertformulär
     - Har formuläret ett data-endpoint (t.ex. Formspree/Netlify/egen server) skickas det dit.
     - Annars öppnas besökarens e-postprogram med förfrågan färdigifylld till adressen i data-mailto. */
  var form = document.querySelector("form[data-offert]");
  if (form) {
    var status = form.querySelector(".form__status");
    var show = function (msg, isError) {
      status.textContent = msg;
      status.classList.add("is-visible");
      status.classList.toggle("is-error", !!isError);
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var data = new FormData(form);
      if (data.get("webbplats")) return; // honungsfälla mot spam

      var endpoint = form.getAttribute("data-endpoint");
      if (endpoint) {
        var button = form.querySelector("button[type=submit]");
        button.disabled = true;
        fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (res) {
            if (!res.ok) throw new Error(res.status);
            form.reset();
            show("Tack! Din förfrågan är skickad. Vi återkommer så snart vi kan.");
          })
          .catch(function () {
            show("Något gick fel när förfrågan skulle skickas. Ring oss gärna på 0611-201 22.", true);
          })
          .finally(function () {
            button.disabled = false;
          });
        return;
      }

      var labels = {
        namn: "Namn",
        epost: "E-post",
        telefon: "Telefon",
        arrangemang: "Typ av arrangemang",
        datum: "Datum",
        gaster: "Antal gäster",
        meddelande: "Meddelande"
      };
      var lines = [];
      Object.keys(labels).forEach(function (key) {
        var value = (data.get(key) || "").toString().trim();
        if (value) lines.push(labels[key] + ": " + value);
      });
      var subject = "Offertförfrågan" + (data.get("arrangemang") ? " – " + data.get("arrangemang") : "");
      var href =
        "mailto:" +
        form.getAttribute("data-mailto") +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(lines.join("\n"));
      window.location.href = href;
      show("Ditt e-postprogram öppnas med förfrågan ifylld – tryck på skicka där. Fungerar det inte? Mejla eller ring oss direkt.");
    });
  }
})();
