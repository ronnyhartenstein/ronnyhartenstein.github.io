---
layout: post
title: Buch Review zu Crafting Quality Software (Qafoo GmbH)
date: '2018-05-14'
---

Die nachfolgenden kommentierten Fundstücke aus der Qafoo-Team-Blog-Sammlung ist für mein zukünftiges Ich geschrieben - quasi ein TL;DR zum Buch. Allerdings möchte ich damit auch anregen, selbst das PDF zu lesen. Für mich, einen PHP-Entwickler mit viel Legacy-Background und eher wenig Test-Erfahrung, bot es einen Rundumschlag über viele alltägliche Aspekte von Brownfield-Software-Engineering. Damit war es mir möglich, mein angelesenes Wissen und gebildetete Meinung zum z.B. Mocking - aber auch besonders Behat - durch die fundierten Ausführungen zu justieren und festigen.

Das Buch sammelt Blog-Post u.a. zu den Themen **Clean Code**, **Object Oriented Design**, **Testing**, **Refactoring** und **Workflow**. Hie und da hab ich nicht nur Zitate kopiert sondern noch ein wenig ausschweifender resümiert und weitere Quellen bemüht.
 
<!--more-->

<p style="font-size: 1.5em;">
  <a target="_blank" href="https://qafoo.com/blog/106_crafting_quality_software.html"><strong>⤳ ↝ ⇶ Hier gehts zum Buch-Download</strong></a>
</p>

## zu 2. Clean Code

### zu 2.1 Developers Life is a Trade-Off

> There is no silver bullet and one of the most important skills every developer needs to hone is to assess possibilities and to find the best trade-off for the current challenge.

### zu 2.1.2 Overengineering State Machines

Schönes Beispiel wie man ein Problem richtig Clean und mit Architektur runterprogrammiert, und es der nächste Kollege trotzdem nicht warten kann weil es für das bisschen was es tut overengineert ist.

> Whenever you take a software design decision in your project, there is a ton of possible solutions. Just picking a random, interesting, clean, ... one is most probably not the right choice. Instead, you need to check your actual constraints and then find the best trade-off between the possibilities. Which one that is can vary greatly.

### zu 2.2 Never use `null` (throw Exceptions!)

Wenn eine Methode/Klassenkonstruktor eine Objektinstanz benötigt, man aber im besonderen Fall die Funktionalität nicht benötigt, gibt man statt `null` eine Null-Implementierung rein. Also eine Objekt die zwar das geforderte Interface implementiert, aber bei allen Funktionsaufrufen einfach nix tut. Damit erspart man sich `null`-ge-`if`-e. Das kann ein Null-Mailer, ein Null-Logger oder Null-Fremd-API-Aufrufer sein.

> Those null objects are usually really trivial to implement. Even it costs time to implement those you’ll safe a lot time in the long run because you will not run in `Fatal Errors` and have to debug them.

Ein `null` als Return Value zu verwenden statt eine Exception zu werfen ist immer noch gängige Praxis. Das macht einen das Leben schwer.

> It is, again, a lot harder to debug if this occurs in a software you use but you are not entirely familiar with. The `null` return might pass through multiple call layers until it reaches your code which makes debugging that kind of code a journey through layers of foreign and undiscovered code – sometimes this can be fun but almost never what you want to do when in a hurry.

Innerhalb von Value-Objects ist `null` okay und zeigt an, dass das Property nicht belegt ist.

> Using null can be valid inside of value objects and sometimes you just want to show nothing is there. In most cases null should be either replaced by throwing an exception or providing a null object which fulfills the API but does nothing. Those null objects are trivial and fast to develop. The return on investment will be huge due to saved debugging hours.

### Ein Ausflug zu Exceptions

Eine gute Übersicht zu den Möglichkeiten gibt es [hier](https://blog.eleven-labs.com/en/fr/php7-throwable-error-exception/), in der [PHP Hilfe](http://php.net/manual/fr/language.errors.php7.php) selbst, und [hier](http://www.phptherightway.com/#exceptions).

Die Basis ab PHP 7 bildet `Throwable`. Davon abgeleitet gibt es `Error` für die PHP-internen Fehler und Warnungen, und es gibt g'ol `Exception`. Das Interface `Throwable` darf man nicht implementieren sondern muss zwingend von `Exception` oder `Error` ableiten. 

Einen `Error` braucht man selbst praktisch nie werfen, höchstens wenn man in einer Variadic Function (mit beliebig vielen Params) eine ungültige Anzahl Parameter übergeben bekommt.

Für den täglichen Gebrauch sind die wichtigsten Standard-Exceptions wohl `LogicException` für logische Fehler die eine Code-Korrektur erfordern. `RuntimeException` für Laufzeit-Fehler wie ungültige Daten, nicht erreichbare Ressource etc. Und `ErrorException` für alles andere :) 

#### Kontext zur Fehlermeldung

Üblich ist:

```php
throw new RuntimeException("Ungültiger Parameterwert '$bla'");
```

Besser ist es den Wert als Kontext mitzugeben und den Fehlermeldungstext statisch zu halten. Dann kann man im Log-Backend (z.B. **Graylog**) diese Fehler gruppieren und Metriken fahren. Ist der Text aufgrund des Variableninhaltes immer anders schießt man sich diese Möglichkeit ab.

Also besser: 

```php
class MyRuntimeException {
  private $context = [];
  public function __construct($message = "", array $context = [], $code = 0, Throwable $previous = null) {
    parent::__construct($message, $code, $previous);
    $this->context = $context;
  }
  public function getContext() {
    return $this->context;
  }
}

// im Code dann..
return new MyRuntimeException("Ungültiger Parameterwert", ['bla' => $bla]);
```

Natürlich muss der Logwriter entsprechend reagieren. Ggf. ergibt ein eigenes Interface `ExceptionWithContext` Sinn. Aber Achtung: ein Interface sollte keinen Konstruktor vorschreiben.

#### Weitere Techniken

**Rethrow:** Man kann Exceptions weiterwerfen. Dazu einfach im `catch` Block nach z.B. eigenen Logging od. Kontext-Erweiterung `throw $e;` aufrufen und weiter im Stack hochblubbern.

**Wrap:** Man kann eine im `catch` gefangene Exception auch in eine neue einwickeln mit `throw new MyException("Bla foo", 0, $e);`. Man kann später dann mit `getPrevious()` auf die vorherige(n) zugreifen.

#### Noch was zur Benamung eigener Exception-Klassen

> Name the Error, not the Issuer

> It is easier to name the exception by its location than by the problem itself. This is not a good practice because the returned message will not be able to identify the cause quickly and simply. For example, a divide by zero operation generates an exception. Raising an exception OperationNotPossibleException gives little indication of the origin of the error. With this name: DivisionByZeroException, the error is clear and precise.

([Quelle](https://blog.eleven-labs.com/en/php_handle-exception-gracefully/))

PHP bringt bei den SPL `LogicException`s schon eine ganze Menge guter Standard-Exceptions mit wie `OutOfBoundsException`, `RangeException` oder auch `UnexpectedValueException`. An der Namensgebung kann man sich orientieren.


### zu 2.3 Struct classes in PHP

Einfach ad-hoc mehrdimensionale Arrays (mit und ohne Keys) sind ein Core-Feature von PHP und ein Grund für dessen Erfolg. Für schnelles Prototyping sind sie ideal. Allerdings für Long-Term- und Enterprise-Level-Projekte (so mit 10 Jahre Entwicklungshorizont) ist die Wartung ein Grauen. Kein IDE-Support, keine Transparenz, neue Entwickler wissen nicht was drin stecken könnte. Spätestens wenn die Feature-Ausprägung (Implementierung) als stabil angesehen werden kann, sollten Data-Objekte (DTOs, Value Objects, Structs) verwendet werden. 

>The benefits:
>- Struct classes are far easier to document
>- Your IDE can provide you with correct auto-completion
>- Your IDE even knows the type of each child in a struct allowing you to create and process deeply nested structures correctly
>- You can be sure which properties a passed struct has - no need to check the availability of each property on access
>- Structs can throw exceptions access to non-existent properties


> The drawbacks:
>- The structs are objects, which means they are passed by reference. This can be an issue if you are operating on those structs. 

**Lösung:**
- Immutable gestalten (`__construct()` beachten, [Referenz](http://blog.florianwolters.de/educational/2013/03/07/Pattern-Immutable-Object/#php-54))
- nur Getter, via `__get` gefiltert, unbekannte Properties mit `InvalidArgumentException` quittieren, zudem `clone` verwenden ([Referenz](http://blog.florianwolters.de/educational/2013/03/07/Pattern-Immutable-Object/#php-54))
- keine Setter - via `__set` mit Exception quittieren, set nur via Constructor
- deep-copy `clone` via Magic Function `__clone`
- automagische `withX` Methode via `__call`, um ein neues Objekt mit einer geänderten Eigenschaft zu erzeugen, unbekannte Properties mit `BadMethodCallException` quittieren

**Für Debugging und Komfort:**
- LSB-Funktion (Late-static-binding) `__set_state` implementieren damit es bei `var_export` sauber zu exportiern
- Funktion `__debugInfo` implementieren um es bei `var_dump` sauber zu dumpen
- Interface `ArrayAccess` implementieren um es wie ein Hash-Array aufzurufen
- Funktion `__toString` implementieren wenn man eine Repräsentation bei String-Konvertierung benötigt (eher bei Value-Objekten denn bei Structs)

> For POCs (Proof-of-Concepts) I tend to still use arrays for structs, but once the software reaches production quality I tend to convert array structs into struct classes since some time in the software I write / maintain.


## zu 3. Object Oriented Design

### zu 3.4 Abstract Classes vs. Interfaces

Wann Interface, wann Abstrakte Klasse? Interfaces beschreiben **Verhalten**, Abstrakte Klassen sind Basis-**Typen** (Entitäten, Modelle, Business-Logik). Beide Interfaces sollten auf `able` und `ing` (deutsch: `bar`, `end`) enden. `Cacheable` (`Speicherbar`), `Serializable`, `Countable` (`Zaehlbar`). Damit indiziert ein Interface einen Nutzungseffekt.

Ein Beispiel (aus dem Buch): Interface `Trinkbar`. Ein Objekt von Typ `See` und `Kaffee` kann `Trinkbar` sein, haben aber sonst nichts gemein.

Beispiele für Abstrakte Klassen:  `Logger`, `Cache`. Es gibt verschiedene Implementierungen von Cache, mit jeweils unterschiedlichen Konstruktoren aber einigen gemeinsamen Basisfunktionalitäten (Formatter, Getter, Setter).

> An `interface` **must not** define a constructor. **Never**. The same is true for most abstract classes. By defining a constructor you predefine and limit what dependencies may be injected in implementations.


### zu 3.5 ContainerAware Consider Harmful

Symfony hat seinerzeit `ContainerAware` (`*Interface`) eingeführt, um anzuzeigen, dass eine Klasse den DI Container *im Bauch* hat. D.h. im Konstruktor muss man die Instanz des DI-Containers reinreichen. Aufrufe zum DI-Container sind dann überall in der Klasse versteckt (verstreut). Mocking so sehr schwierig ohne Studium des Codes. Besser (wie immer) ist Construktor-Injection. 

> `ContainerAware` is the new Singleton.

> No class of your application (except for factories) should know about the Dependency Injection Container (DIC).

In Laravel gilt das gleiche für die Services-`Facade`. Auch hier kann man einfach mit statischen Aufrufen wie `Mail::send()` indirekt auf den DI-Container zugreifen. Sicherlich ist der Ansatz sehr pragmatisch, aber halt **implizit** und man darf im Unittest dann nicht `Mail::fake()` vergessen. Construktor-Injection ist **explizit** und man muss im Test eine `Mail` Instanz reingeben.


Unabhängig vom Kontext des Artikels sollte man noch folgenden Satz im Hinterkopf behalten.

> Whenever you feel the need to mock a method of the test subject, that is a clear sign for the need to refactor (so-called code smell).


### zu 3.6 Code Reuse By Inheritance

> Unit-testing a class which uses logic from a base class, for example accessing the database, is a lot of work. The best way is usually to mock all methods (from the parent class) which access the database and then run the tests on the mocked subject while correctly simulating the return values from your database. This is damn tedious.

Man kann den komplexen Code der Basisklasse in kleinere Methoden aufteilen. Die sind dann meist `private` oder `protected`. 

> The urge to test private or protected methods is, in my opinion, a code smell which should directly lead to refactoring.

Nun ja, mittels `Reflection` kann man die auch aufsperren. Und einige davon kann man dann als statische Funktionen in separate Klassen rausziehen.

> I guess the *fear of (many) classes* applies here again, which I consider void.

Keine Angst vor vielen Klassen, sinnvolles Strukturieren in Namespaces hilft den Überblick zu wahren.

> Then there is the "Depth of Inheritance Tree" (DIT) metric with a common boundary value of 5, while the counting even stops at component borders. To me, the maximum value for this metric should be considered 2. 

Eine konkrete Klasse kann eine Basisklasse haben. Keine Klasse leitet von dieser konkreten Klasse ab.

> Except for some struct classes / value objects, there is, in my opinion, no reason for more then one level of extension of a class. If you use inheritance just for defining the _type_ of classes, you will never extend more than once. If you are tempted to do that, use aggregation instead and you are probably fine in 99% of all cases.


### zu 3.8 When to Abstract?

Wann lohnt es sich eine abstrakte Lösung zu definieren?

> But especially in the area of Internal Projects the circumstances change often and fast. You will have no idea what the next requirement of the project stakeholders will be. So, let’s be blatant: Do not abstract! Do not use interfaces or abstract classes.

Keine vorausschauenden Optimierungen ("premature optimizations"), keine komplizierten Softwaretechniken wenn schlichtes runterprogrammieren zum erledigen vorerst reicht. Die meisten Kundenprojekte sind keine Framework-Entwicklungen.




## zu 4. Testing

### zu 4.1 Finding the right Test Mix

> Unit-tests are necessary to stabilize your code, but when you know the requirements are not stable yet, then having too many unit-tests can be a burden as well.

> Unit-test only those parts of the application that are mission critical, highly reused parts of the infrastructure (high cohesion) or stable already.

> Failures in unit-tests are also much easier to analyze than failures in acceptance tests.

> TDD is about design and not about unit-testing and 100% coverage. Using acceptanceand integration-tests is a valid approach for TDD and serves well during periods of spikes and frequent requirement changes.


### zu 4.2 Mocking with Phake

> Test Doubles allow you to replace dependencies of an object with lookalikes, much like crash test dummies are used during automobile safety tests so humans aren’t harmed.

> Test Doubles Explained:
>- Add expectations of the arguments passed to a method (**Verification**)
>- Add results that are returned from a method-call to the mock object (**Stubbing**)
>- Delegate calls to the original code (**Spying**)

#### Die "richtige" Lib

**TL;DR:** Mockery ist schon okay, kann alles, hat eine gut lesbare API und alle nötigen Features.

Mockery vs [Phake](https://packagist.org/packages/phake/phake): https://prezi.com/jafacc6i25cv/which-mock-framework-to-choose/

Mockery vs. [Prophecy](https://github.com/phpspec/prophecy): http://everzet.com/post/72910908762/conceptual-difference-between-mockery-and-prophecy


### zu 4.7.3 Test Data

Tipp: [Alice](https://github.com/nelmio/alice) - Expressive fixtures generator

### zu 4.10 Outside-In Testing and the Adapter and Facade Patterns

> The technique puts a focus on test-driven-development, but instead of the traditional approach starts at the acceptance test level. The first test for a feature is an acceptance test and only then the feature is implemented from the outside classes first (UI and controllers), towards the inner classes (model, infrastructure).

Das Kapitel zeigt ein echt gutes Howto für Refactorings, speziell Service Extraction.

TDD kann auch bedeuten, man schreibt Akzeptanz-Tests in Gherkin-Syntax (Behat, eigentlich BDD), mockt feste alle externen Schnittstellen weg, und später kommen erst Unit-Tests hinzu zur Stabilisierung - im Zweifel nur für die wichtigen Teile.

> The technique stays the same: Think in terms of what you want the API to look from the outside and invent collaborators that help you think about the problem. Then implement them until you get to the "leafs" of the object graph. Only the leafs should actually contain code to third party software.

### zu 4.11 Behavior Driven Development

Behat mit seinen in Gherkin-Syntax geschriebenen Akzeptanz-Tests sind super für die Entwickler-Kunden-Kommunikation.

> The wonderful thing about this specification is that your customer can actually read and verify it. You can write down what you, as a developer, understood how your customer wants the system to behave. You can send the specification to her/him and ask her/him if this is exactly what she/he desires. If she/he agrees, you can start implementing right away and verify your progress against the specification,
as it is executable through a BDD test tool.

### zu 4.14 Five Tips to Improve Your Unit Testing

1. **Be Pragmatic About a "Unit"**
2. **Test Where the Logic is**
  > Instead of focussing on trivials, look where there really is logic. In technical terms: Where are the loops, conditions, private methods and so on? Focus on these places. Accept the challenges they offer and write tests for stuff that matters.
3. **Continuously Refactor Test Code**
  > **Never** change production and test code at the same time. When you refactor your test code, the production code is the reference to asserts tests are still working as they should. And of course your tests are the assertion while working on your production code.
4. **Build Your Own Set of Utilities**
5. **Always Write Tests for Bugs (Regression tests)**


### Einschub: The State of Testing in PHP in 2018

Von [Codacy gibts einen schönen Artikel](https://www.codacy.com/blog/the-state-of-testing-in-php-in-2018/) zum Stand von Tests mit PHP in 2018.

**TL;DR**: Es schaut sehr gut aus. Alle Major-Frameworks bieten Testing als First-Class Citizen an. Auch auf Konferenzen, Meetups und Fachmagazinen finden sich immer wieder Beiträge rund um Tests. Mit PHP 7 gibts nunmehr **Scalar Type-hinting** und Return Type Declaration - jede davon ist immer ein kleiner Test. Bei den vielen Test-Frameworks und -Tools haben nur wenige eine signifikanten Support-Level - u.a. die nachfolgend genannten. **Mockery** ist zum mocken eine gute Wahl. **Behat** ist immernoch gut für BDD-Tests im "Context-Action-Outcome" oder Gherkin Format. **PHPUnit** ist der Großvater der Test-Tools und weiterhin Defacto-Standard. **Codeception** schickt sich an alle Vorgenannten zu ersetzen - quasi als umfassende One-fits-all-Lösung. 



## zu 5. Refactoring

### zu 5.1 Loving Legacy Code

> The first thing to realize about existing code bases - no matter how bad you feel their quality is - is that it provides business value. The code is in production and people use it and gain value from that. For us as developers that means: The business rules that the appplication is meant to reflect **are already written down in code.**


### zu 5.3 Extended Definition Of Done

"Definition Of Done" ist die Grundlage für eine Bewertung und Einschätzung eines Merge Requests - die Grundlage für den Review.

> A common Definition Of Done we agree on could look like the following points. Remember that this might vary a lot depending on the domain, the team and the already existing patterns: [...]


### zu 5.4 How to Refactor Without Breaking Things

> Code coverage can be of good help here to see if you have already enough tests to be safe. [Behat, PHPUnit with Mink] But beware: the goal is not `$someHighPercent` code coverage! The goal is to give you a good feeling for working with the underlying code. Once you have reached that state, stop writing tests and focus on the actual refactoring again.

#### Baby Steps

**TL;DR:** Refactoring in wirklich keinen Schritten durchführen. Gleich anschließend die Tests laufen lassen, commiten. Wenn der Weg in die Irre führt (= Tests schlagen fehl), Änderungen resetten. Auch wenn das Zielbild so länger braucht, evtl. ändert sich unterwegs der Weg. Oder man wird unterbrochen, oder eine wichtigere Aufgabe drängt.


### zu 5.5. Getting Rid of `static`

Wichtiger Hinweis zum Verständis des DI-Containers im Zusammenhang von Refactorings. 

> The `DependencyInjectionContainer` is **only** used inside your `index.php` and not passed to any class. As an additional migration step you *may* use it inside your Service Locator until we migrated away from it entirely.

Deswegen auch den Ansatz `ContainerAware` aus Kap. 3.5 vermeiden.


### zu 5.6 Refactoring Should not Only be a Ticket

> Refactoring should never only be a dedicated task on your board. It should be an essential part of every other task you work on.

Ja, genau wie Tests sollte nicht die Frage sein, wieviel Zeit man dafür im Projekt bekommt. Man fragt am Anfang eher wie der Qualitätsanspruch im Softwareprojekt sein soll. Darüber entscheidet man wieviel Zeit anteilig man sich für Implementierung, Refactoring und Tests nimmt. Gunter Dück hat einmal von 30% für Refactoring gesprochen. Wenn man 100% Zeitaufwand bzgl. der eigentlichen Implementierung annimmt, verteilt es sich grob 1/3 Implementierung, 1/3 Tests, 1/3 Refactoring - also praktisch 2/3 Implementierung mit stetischem Refactoring und 1/3 Tests. Also kurz und gut 3/3 modern-style Entwicklung.

Streng genommen macht man doch immer ein bisschen Refactoring beim Entwickeln. Aber wenn man sich den Aufwand bewußt macht und es als Invest in Qualität sieht, stresst man sich selbst nicht so durch den Prozess, **eben weil es Teil der Entwicklungsleistung ist.**


### zu 5.7 Extracting Data Objects

Im Kap. 5.7.3 wird eine Smooth Migration beschrieben.

1. neue Funktion mit Data Objects neben die alte Fkt. mit Parameter-Wüste stellen mit leicht anderen/besseren/cleaneren Namen
2. alte mit `@deprecated` kennzeichnen - alle Stellen werden von der IDE nun hervorgehoben (durchgestrichen)
3. alte Funktion zu neuer dispatchen
4. eigenen aktuellen Use-Case anpassen
5. nach und nach über Tage und Wochen, wann es passt, auch durch andere Kollegen, die alten Fkt.-Aufrufe auf die neue umschreiben
6. die alte Funktion löschen (und freuen)

### zu 5.8 Basic Refactoring Techniques: Extract Method

> As a rule of thumb, code in a method should work on the same level of abstraction (high- vs low-level code) to hide unnecessary details from the programmer when reading code. Mixing high level controller with low level data access does not hold up to that rule.

Vorgehen:
>1. Identify code fragment to extract
>2. Create empty method and copy code
>3. Identify undeclared variables that must be arguments
>4. Identify variables that are still used in old method
>5. Call new method from original method 

> Extract Method is a fundamental building block for more advanced refactorings such as Extract Service and refactoring towards different design patterns.


### zu 5.9 How to Perform Extract Service Refactoring When You Don’t Have Tests

>1. Create Class and Copy Method
>2. Fix Visibility, Namespace, Use and Autoloading
>3. Check for Instance Variable Usage
>4. Use New Class Inline
>5. Inline Method
>6. Move Instantiation into Constructor or Setter
>7. Cleanup Dependency Injection

> Compared to the extract method refactoring, extracting a service requires more steps and each of them is more risky. On top of that IDEs usually don’t provide this refactoring as an automatic procedure, so you have to do it manually. But even though the refactoring is risky, you should learn and master it, because it is very effective at splitting up code that started out simple and got more complex over time.


### zu 5.10 How You Can Successfully Ship New Code in a Legacy Codebase

> Usually the problems software needs to solve get more complex over time. As the software itself needs to model this increased complexity it is often necessary to replace entire subsystems with more efficient or flexible solutions. Instead of starting from scratch whenever this happens (often!), a better solution is to refactor the existing code and therefore reducing the risk of losing existing business rules and knowledge.


### zu 5.11 Extracting Value Objects

Mal zum Unterschied von DTOs, Value- und Data-Objects/Structs.
- Data-Transfer-Objects (DTOs) transportieren Daten **nach außen** - überbrücken also Systemgrenzen bzw. Layers - Daten-Transport eben, z.B. Zulieferer für `json_encode` bei REST-JSON-Responses
- **Data-Objects** transportieren Daten **innerhalb der Anwendung**, als Methodensignatur anstatt vieler Parameter, oder Rückgabewert.
- **Value-Objects** transportieren Werte - sind also Werte-gleich. `OneEuroCoin == OneEuroNote` - Property `value` und `currency` ist gleich, aber `material` nicht (String `coin` vs. `note`), macht Objekte anhand ihres Wertes vergleichbar und nicht anhand der Referenz. Sind ein guter Kandidat für Immutability

> The problem here is a code smell that is widespread in every codebase I have ever seen and is called "Primitive Obsession". It means that as developers we often rely on the most basic types of our programming language, instead of increasing the abstraction and introducing new types.

Nachfolgendes stammt von [Stackoverflow](https://stackoverflow.com/questions/6986032/difference-between-value-object-pattern-and-data-transfer-pattern):

>- `CustomerAndLastFiveOrders` is a DTO (optimized to avoid multiple network calls)
>- `Customer` is a Entity (oder Data-Object)
>- `Money` is a Value object

> Value object is an object whose equality is based on the value rather than identity.

> DTO (Data Transfer objects) is a data container for moving simplifying data transfer between layers.


## zu 7. Workflow

### zu 7.2 Why you need infrastructure and deployment automation

> Software quality does not stop with tests and good CodeSniffer and PHP Mess Detector scores. The deployment and setup is equally important to the quality of an application. From our experience, this is a field where many teams could still achieve huge productivity gains.

Tipps zu Tools für DB Migration.

> For database migrations there are tools such as [DBDeploy](http://dbdeploy.com/), [Liquibase](http://www.liquibase.org/) or [FlywayDB](http://flywaydb.org).


