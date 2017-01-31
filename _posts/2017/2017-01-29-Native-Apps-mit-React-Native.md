---
layout: post
title: React Native Ökosystem (Ende 2016, Anfang 2017)
#date_first: '2016-06-11'
date: '2017-01-29'
---

Im September 2016 kam bei meinen Arbeitgeber die Frage auf, mit welchen Mitteln würde man die nächste App angehen. 
Produktiv haben wir erfolgreich eine Ember-basierende App und eine Meteor-basierende App.
Was sagen andere die Erfahrungen mit den Techs gemacht haben, würden die dieses wieder verwenden? 
Wie bekommt man das "Native App Erlebnis" aka 60fps hin?

<!--more-->

In einen ersten Schritt habe ich auf den einschlägigen Kanälen nach Expertenmeinungen gesucht und zusammengetragen
im Dokument ["Stand der Web Apps: Native vs. Hybrid vs. Mobile" (PDF)](/files/2017/StandderWebApps.pdf).

Daraus kristalisierte sich, dass React Native ein zwar junges aber doch schon dank massivem Support durch Facebook gereiftes Projekt ist.
Um mittelfristig eine fundierte Entscheidung treffen zu können, war eine Analyse der Möglichkeiten des Ökosystems unausweichlich. 

Die beste Erfahrung macht man indem man eine App wirklich programmiert. Ich kann ein Buch zu NodeJS lesen, aber wenn ich die ersten Zeilen programmiere, 
dann bekommt man erst mit, was es heißt in der Callback-Hölle zu landen. Da kamen mir Pilzdaten meines Vaters ganz gelegen. 
Listendarstellung, Detailansicht, Bilder, Merkliste, Datenhaltung mit Redux - wird alles benötigt, ist dann eine echte App.
Anhand dieses mittelkleinen Projektes habe ich mich dann durch die verschiedenen Facetten gehangelt und recherchiert.

Am Ende entstand ein Vortrag, den ich im November/Dezember bei meinen Arbeitgeber und auch im Januar bei [DresdenJS](http://dresdenjs.io/) gehalten habe - in verschiedenen Kontexten natürlich.
Zudem ist mittlerweile für [CodeforChemnitz](http://codeforchemnitz.de) der [Theaterwecker](https://theaterwecker.de/) als App in der Entwicklung.

Folien zum Vortrag ["Native App Entwicklung auf Pilzen"](http://blog.rh-flow.de/pilzliste-react-native-redux/) - in drei Teilen:

* [**React Native**: Motivation, Pilzprojekt, Ökosystem](https://github.com/ronnyhartenstein/pilzliste-react-native-redux/blob/gh-pages/Talk%20React%20Native.pdf)
* [**React**: Entstehung, Komponenten, Stylesheet](https://github.com/ronnyhartenstein/pilzliste-react-native-redux/blob/gh-pages/Talk%20React.pdf)
* [**Redux**: Paradigmen, Suche und Trefferliste, Prefill](https://github.com/ronnyhartenstein/pilzliste-react-native-redux/blob/gh-pages/Talk%20Redux.pdf)

Projekte:

* [GitHub: Pilzliste mit React Native und Redux](https://github.com/ronnyhartenstein/pilzliste-react-native-redux)
* [GitHub: Theaterwecker](https://github.com/CodeforChemnitz/TheaterWecker/tree/app/app)

Nachfolgend sind noch die ganzen Recherchen gelistet - hauptsächlich auch für mich selbst zum nachschauen.

## Einstieg, Kernidee, Dokumentation, Quellen

* Use JavaScript as the language doesn't have a long compilation cycle time.
* Implement a tool called Packager that transforms es6/flow/jsx files into normal JavaScript that the VM can understand. It was designed as a server that keeps intermediate state in memory to enable fast incremental changes and uses multiple cores.
* Build a feature called Live Reload that reloads the app on save.


React und seine Alternativen

> Die Besonderheit liegt darin, mittels der Komponenten HTML in JavaScript integrieren zu wollen, statt andersherum. Das kommt einerseits der Übersichtlichkeit des Codes zugute und andererseits lassen sich dadurch von Hand durchgeführte DOM-Manipulationen vermeiden, an denen bspw. Web Components und AngularJS weiterhin kranken (etwa im Fall von Data Binding).

[(Quelle)](https://entwickler.de/online/javascript/react-244922.html)


**[UIExplorer](http://www.reactnative.com/uiexplorer/)**
(per Playstore verfügbar!)

* [Offizielles Tutorial](http://facebook.github.io/react-native/docs/tutorial.html)
* [Offizielles GitHub Repo](https://github.com/facebook/react-native)
* [Awesome List](https://github.com/enaqx/awesome-react/#react-native)
* [Subreddit](https://reddit.com/r/reactnative) 
* [Official Roadmap](https://github.com/facebook/react-native/wiki/Roadmap)

**Getting Started**

* Follow the Getting Started guide to install React Native and its dependencies.
* Check out this tutorial to walk through your first project that fetches real data and displays it in a list.
* Open the UIExplorer example project to see a list of components that ship with React Native.
* Install the React Developer Tools for Chrome or Firefox for better debugging (read more).
* Try out apps from the Showcase to see what React Native is capable of!

**React Native TODO Example**

* [ReactNative-Redux-Todo-List](https://github.com/ajwhite/ReactNative-Redux-Todo-List) basiert noch auf React 0.14.3 - aktuell ist >0.33.0 (npm Package)
* [Redux ExampleTodoList](http://redux.js.org/docs/basics/ExampleTodoList.html)
* [React Native UI Elements](https://github.com/react-native-community/React-Native-Elements)
* [Blog-Post](https://medium.com/@dabit3/introducing-react-native-elements-e3d78389b7ea)

* und App die alle Elemente zeigt - [Hackathon Starter](https://github.com/dabit3/react-native-hackathon-starter)
* [Farben & Farbnamen](http://facebook.github.io/react-native/docs/colors.html)

**[rnpm](https://github.com/rnpm/rnpm) - React Native Package Manager** (deprecated)
braucht man nicht mehr, wurde in React Native Core übernommen


### Props vs. State - Component API

* Doku: http://www.reactnativeexpress.com/component_api
* props sind schreibgeschützt und nicht für den momentanen änderbaren Zustand einer Komponente geeignet
* state niemals direkt ändern mit `this.state.bla=2` sondern immer über `this.setState` - damit rendering angestoßen wird

**this.props**

Components can be configured upon instantiation by passing properties to the constructor - these properties are called props. props may be accessed from within the component's methods as this.props, in order to alter how the component is rendered and/or how it behaves. However, props must not be altered from within the component's methods.
A parent element may alter a child element's props at any time. The child element will generally re-render itself to reflect its new configuration parameters. A child component may decide not to re-render itself even though its configuration has changed, as determined by shouldComponentUpdate() (more on this in the Component Lifecycle API section).

**this.state**

Components may maintain their state internally within the object state. this.state may be accessed from within component methods. Unlike props, parent elements may not access a child's state, as it is intended to manage the child's internal state rather than external configuration.
Note that you should never directly assign to a specific key within the state object, e.g. this.state.foo = 'bar', but instead use the method this.setState().


### Lifecycle API

http://www.reactnativeexpress.com/lifecycle_api

Components have a lifecycle: they are instantiated, mounted, rendered, and eventually updated, unmounted, and destroyed. The lifecycle helps manage the complexity of different platform APIs (iOS, Android) by providing a simple, consistent abstraction layer. The lifecycle also allows you to optionally execute custom code at each step for more fine-grained control of the rendering.

Bei JS-Fehler in iOS App kann per "JS Reload" im Fuss das JS neu geladen werden - ohne Rebuild

**state in constructor setzen vs. getInitialState**

[Ask: What is the difference between using constructor vs getInitialState in React / React Native?](http://stackoverflow.com/questions/30668326/what-is-the-difference-between-using-constructor-vs-getinitialstate-in-react-r#30668609)

`this.state` in constructor direkt bei ES6 Klassen, getIintialState bei ES5



## Debugging

**Debugging aktivieren** 

* [Doku](https://facebook.github.io/react-native/docs/debugging.html)
* auf iOS -> Cmd+D
* auf Android -> Cmd+M


**[Reactotron](https://github.com/skellock/reactotron)**

> A desktop app for inspecting your React JS and React Native projects.


**[react-native-debugger](https://github.com/jhen0409/react-native-debugger)**

> The standalone app based on official debugger of React Native, and includes React Inspector / Redux DevTools

**[Stetho](http://facebook.github.io/stetho/)**

> Stetho is a debug bridge for Android applications, enabling the powerful Chrome Developer Tools and much more.


## Upgrade RN (via Git)

[Doku](https://facebook.github.io/react-native/docs/upgrading.html)

```
react-native-git-upgrade
```

benutzt *Breaking Changes* aus Wiki
https://github.com/facebook/react-native/wiki/Breaking-Changes



##Redux 

[Tutorial](http://www.reactnative.com/getting-started-with-react-native-and-redux/)

Reducer sind Pure Funktionen, dürfen übergebenen state nicht ändern, sondern ein neues Object
this.state + setState an React Komponenten kann komplett entfernt werden, da Zustand von Redux über Props eingespült wird
Eventhandler kommen auch per Props rein, z.B. `onRemoveSmth`

[Prior Art](http://redux.js.org/docs/introduction/PriorArt.html):
basiert auf Flux (Facebooks State für React), Elm ("model view update" Architektur), Immutable (persistene Datenstruktur, Undo History!)), Baobab, Rx (u.a. Observables)

[Komponenten an Redux anbinden](https://github.com/ronnyhartenstein/pilzliste-react-native-redux/commit/5df681546114082e170d5ef575763d5afc886f30)

`combineReducers` und `loadStore` mit `preloadedState`

* [Ask: Read Store's Initial State in Redux Reducer](http://stackoverflow.com/questions/33749759/read-stores-initial-state-in-redux-reducer#33791942)
* [Commit in pilzliste-react-native-redux](https://github.com/ronnyhartenstein/pilzliste-react-native-redux/commit/f187f280aabd6f237ba5b0e197969572c570c1de)
* Updates in Redux-Connector verändern Props -> `componentWillReceiveProps` statt auf State-Änderung hoffen..

**Memoized Selectors** um mapStateToProps bei großen Datenmengen nur mit den Änderungen zu bedienen

* http://redux.js.org/docs/recipes/ComputingDerivedData.html#creating-a-memoized-selector
* https://github.com/ronnyhartenstein/pilzliste-react-native-redux/commit/e27025297d2cb02f37da74e57df85c5d0f8336f9

[**Realm** mit Redux Beispiel](https://github.com/realm/realm-js/issues/141)

[Finite](https://hackernoon.com/a-finite-state-machine-helper-for-redux-c18519643719#.i5u6yfdaq) [State](https://www.npmjs.com/package/redux-machine) Machine in Redux

[Undo History](http://redux.js.org/docs/recipes/ImplementingUndoHistory.html#using-redux-undo)


## Production Build Android

* [How to build React Native Android App for production](http://stackoverflow.com/questions/32629379/how-to-build-react-native-android-app-for-production)
* [reactnative-android-production](https://github.com/shyjal/reactnative-android-production)

Signaturfile erzeugen:

```
keytool -genkey -v -keystore my-keystore.keystore -alias name_alias -keyalg RSA -validity 10000
```

Android Build:

```
./gradlew assembleRelease
jarsigner -verbose -keystore my-keystore.keystore app/build/outputs/apk/app-release-unsigned.apk name_alias
adb install app/build/outputs/apk/app-release-unsigned.apk
```

Build beschleunigen -> Gradle Daemon aktivieren
in `./android/gradle.properties` -> `org.gradle.daemon=true`


[Android Emulator (AVD) von Kommandozeile starten](https://developer.android.com/studio/run/emulator-commandline.html)

```
/usr/local/bin$ ln -s $ANDROID_HOME/tools/emulator
emulator -list-avds 
emulator -avd Nexus_5_API_23_x86
```

Fehler "Qt library not found at /usr/local/bin/lib64/qt/lib"? [Antwort auf SO](http://stackoverflow.com/questions/36565704/why-does-avd-need-the-qt-library)

`brew install qemu`

es bleiben Fehler :(

`brew remove qemu`

```
/usr/local/bin$ ln -s $ANDROID_HOME/tools/android 
android avd
```

:)

## ListView Performance

**Lazy Load**

* Große Datenmengen führen im verwendeten RN-Componentes List und ListView zu langen Ladezeiten
* Lazyload baut Views und Inhalte bei Bedarf aus State-Daten
* [react-native-lazyload](https://www.npmjs.com/package/react-native-lazyload()
* [Commit in pilzliste-react-native-redux](https://github.com/ronnyhartenstein/pilzliste-react-native-redux/commit/290329704964961f34b56ea941d6086e682dfa42)

**Offizielle Performance-Hinweise**

* [Performance](https://facebook.github.io/react-native/docs/performance.html)
* ListView statt ScrollView!


## Layout

* [Layout Flexbox](https://facebook.github.io/react-native/docs/flexbox.html)
* [Grid](https://github.com/yelled3/react-native-grid-example)


## Image

* Image-Komponente ([Doku](https://facebook.github.io/react-native/docs/image.html))

* kann nur PNG, keine JPG - lolwut?
* [Ask: React Native can't load image](http://stackoverflow.com/questions/30139736/react-native-cant-load-image)

Fehler "The resource could not be loaded because the App Transport Security policy requires the use of a secure connection."

* [Meteor issue "App Transport Security support aka apps on iOS 9 don't work"](https://github.com/meteor/meteor/issues/4560)
* [RN issue "xcode 7.0beta could not connect to development server."](https://github.com/facebook/react-native/issues/1563)
* [RN issue "[Image] Example issue: ImageView not loading image"](https://github.com/facebook/react-native/issues/289)
* Lösung 1: in `info.plist`, `NSAppTransportSecurity NSAllowsArbitraryLoads YES`
* Lösung 2: https aktivieren für Domain und statt http verwenden

Pilzbilder kleinrechnen

* [CLI options für IM resize](http://www.imagemagick.org/script/command-line-options.php#resize)
* [xargs](https://blog.pregos.info/tag/xargs/)
* in `httpdocs/original`: 
  ```sh
  find . -type f -name "*.jpg"  -print0 | xargs -0 -I {} -P 4 convert {} -thumbnail "60x60" -strip  ../thumbnails/{}.png 
  ```

## Navigator / Router
* Routes [wenkesj/react-native-routes](https://github.com/wenkesj/react-native-routes)
* Navbar [react-native-navbar](https://github.com/react-native-community/react-native-navbar)
* WIX Navigation [wix/react-native-navigation](https://github.com/wix/react-native-navigation)
* **Offizieller Router:** [react-native-router-flux](https://github.com/aksonov/react-native-router-flux)
  * [mit Redux](https://github.com/aksonov/react-native-router-flux/blob/master/docs/REDUX_FLUX.md)
  * [Tutorial](https://medium.com/@spencer_carli/react-native-basics-using-react-native-router-flux-f11e5128aff9#.8ykqpl9w4)

Blog-Posts:

* [Routing and Navigation in React Native](http://blog.paracode.com/2016/01/05/routing-and-navigation-in-react-native/)
* [Introducing React Navigation](https://reactnavigation.org/blog/2017/1/Introducing-React-Navigation)

Ein neuer Router ist aktuell auf der [Roadmap](https://github.com/facebook/react-native/wiki/Roadmap) als Alternative zu Navigator, NavigationExperimental, und ExNavigation.


## TouchableHighlight
Tap auf ein Element, highlightet es und führt eine Aktion durch.
([Doku](https://facebook.github.io/react-native/docs/touchablehighlight.html))

**View display:none**, visbility:hidden? height:0 / destroy
[Issue](https://github.com/facebook/react-native/issues/1404)


## Iteration über Elemente mit Child components

benötigt immer key als Attribut
```js
{ this.state.items.map((item, i) => ( 
          <ListeItem key={i} item={item} /> 
        )) }
```

## Fuzzy-Suche

* [mattyork/fuzzy](https://github.com/mattyork/fuzzy) -> zu langsam
* [Commit in pilzliste-react-native-redux](https://github.com/ronnyhartenstein/pilzliste-react-native-redux/commit/c81bb31aeed0d5ec8590ef5695bc8e407e1b90d2)
* ggf. [Bloodhound](https://github.com/twitter/typeahead.js/blob/master/doc/bloodhound.md ) mal probieren
* [Redux Suche](https://github.com/treasure-data/redux-search)


## Debounce TextInput

* [SO: Perform debounce in React JS](http://stackoverflow.com/questions/23123138/perform-debounce-in-react-js)
* [Commit in pilzliste-react-native-redux](https://github.com/ronnyhartenstein/pilzliste-react-native-redux/commit/c6223d5)

## Images mit Ladebalken

* [oblador/react-native-image-progress](https://github.com/oblador/react-native-image-progress)
* [Commit in pilzliste-react-native-redux](https://github.com/ronnyhartenstein/pilzliste-react-native-redux/commit/f61f2d9)

## Images cachen

* [reactnativecn/react-native-http-cache](https://github.com/reactnativecn/react-native-http-cache) -> schwierig
* [remobile/react-native-cache-image](https://github.com/remobile/react-native-cache-image) -> veraltet 
* [machei/react-native-realm-cache-image](https://github.com/machei/react-native-realm-cache-image )

* mit [Realm-Backend](https://realm.io/docs/react-native/latest/#installation)
* nutzt [react-native-fs](https://github.com/johanneslumpe/react-native-fs)
   * Setup Android: MainApplication.java anpassen
   * Setup iOS: brew install cocoapods;  ./ios$ pod init; edit Podfile; pod install
     * CocoaPods: dependency manager for Swift (and ObjC) -> https://cocoapods.org/ 
* react-native-fs geht gerade 2.0.0-RC und deprecated
* [CocoaPods React](https://cocoapods.org/pods/React) ist deprecated und 0.13.0 
* erstmal in [eigenen Branch](https://github.com/ronnyhartenstein/pilzliste-react-native-redux/commits/realm-cache-image-with-fs) gepackt

* [react-native-ximage](https://github.com/mohebifar/react-native-ximage) deprecated
* React >= 0.25.0 kann prefetch und caching ([Commit](https://github.com/facebook/react-native/commit/f7bcb3e98d489bb40ee8fd7dd69918521344f657))

* [Image.prefetch](https://facebook.github.io/react-native/docs/image.html)

* Prefetch nur einmal? Ja! Apache Log prüfen: 
* `tail /var/www/vhosts/system/uli.rh-flow.de/logs/access_ssl_log`
* ([Commit](https://github.com/facebook/react-native/commit/dda38fd))
* Testen mit iOS Simulator - schwierig, gibt [keinen](http://stackoverflow.com/questions/5663480/ios-simulator-offline-mode) [Offline Modus](http://stackoverflow.com/questions/1614802/simulate-airplane-mode-in-iphone-simulator)
* *"Turn off your network connection on the Mac."*

## Offline first

* [React Native Offline First](https://github.com/philipshurpik/react-native-offline-first)
* mit [redux-persist](https://www.npmjs.com/package/redux-persist)

## App Intro  (erste Bedienhilfe)

[react-native-app-intro](https://github.com/FuYaoDe/react-native-app-intro)

## Popups, Dialoge

[react-native-popup-dialog](https://github.com/jacklam718/react-native-popup-dialog)

## React Parts 

* [React Parts](https://react.parts/native) (deprecated) 
* Liste auf [JS.coach](https://js.coach/react-native)

* Kamera [react-native-camera](https://github.com/lwansbrough/react-native-camera)
* HTTP Cache [react-native-http-cache](https://github.com/reactnativecn/react-native-http-cache)
* Google Analytics [react-native-google-analytics](https://github.com/lwansbrough/react-native-google-analytics)
* CameraRoll [rn-camera-roll](https://github.com/bamlab/rn-camera-roll)

* [Splash Screen in RN 0.40](https://www.reddit.com/r/reactnative/comments/5qob3z/splash_screen_with_react_native_v040/)

## RN Plattformen

Android, iOS

**macOS** Desktop Apps
[react-native-macos](https://github.com/ptmt/react-native-macos)


**Windows UWP** (Universal Windows Platform)
[react-native-windows](https://github.com/ReactWindows/react-native-windows)
(aktiver als MacOS!)

**Web** 
[react-native-web](https://github.com/necolas/react-native-web)
(Grundlage für App-Demos in offizieller Doku)  
[Starter](https://github.com/grabcode/react-native-web-starter)


## Stylesheets

[react-with-styles](https://github.com/airbnb/react-with-styles) und 
[react-with-styles-interface-react-native](https://github.com/airbnb/react-with-styles-interface-react-native) 

**Libs**

* [JSS](https://github.com/cssinjs/jss)
* [Aphrodite](https://github.com/khan/aphrodite)
* [Radium](https://formidable.com/open-source/radium/)

## Design Pakete

* **[NativeBase](http://nativebase.io)** ($50)
  * Grundlagen-Design damit es auf Android wie Android und iOS wie iOS ausschaut
* **[Flat Design Pack](https://strapmobile.com/react-native-flat-app-theme/?utm_source=medium&utm_medium=blogbyshweta)** ($100)
* **[Login/Logout Animationen](https://strapmobile.com/react-native-login-logout-animation/?utm_source=medium&utm_medium=blogbyshweta)**  ($35)
* **[Material Design Kit](https://github.com/xinthink/react-native-material-kit)**
  * [Demo](https://github.com/xinthink/rnmk-demo)
  * [Doku](http://www.xinthink.com/react-native-material-kit/docs/index.html)
* **[Shoutem](https://github.com/shoutem)**

## Organisation

[How to better organize your React applications](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1#.bpuvqgnto)

## Storybook

Bootstrapping UI: Storybook
[react-storybook](https://github.com/storybooks/react-storybook)
[getstorybook.io](https://getstorybook.io/)

