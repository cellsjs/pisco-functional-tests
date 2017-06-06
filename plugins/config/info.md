### Configuration plugin
Plugin that generates configuration that will be shared across de pisco execution.

##### Information:
This plugin is going to include three main configuration options in the pisco execution:
* `Requirements configuration`: It will include several requirements for the execution that have to be fulfilled.
* `Plugin dependencies`: This plugin define dependencies for another plugins that have to be fulfilled.
* `Parameter configuration`: This plugin define several parameters that has to be seen for the application. The [priority][1] is the lowest of all.

##### Configuration

* `requirements`: We include the java version 1.8 requirement and the bower-art-resolver.
* `dependencies`:
* `parameters`:

##### Stages

##### Addons




[1]: http://cellsjs.github.io/piscosour/developers/guides/05-parameters.html