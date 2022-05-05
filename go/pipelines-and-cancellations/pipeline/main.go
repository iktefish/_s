/* NOTES:
There’s no formal definition of a pipeline in Go; it’s just one of many kinds of concurrent programs.
Informally, a pipeline is a series of stages connected by channels, where each stage is a group of
goroutines running the same function. In each stage, the goroutines

    - receive values from upstream via inbound channels
    - perform some function on that data, usually producing new values
    - send values downstream via outbound channels

Each stage has any number of inbound and outbound channels, except the first and last stages, which
have only outbound or inbound channels, respectively. The first stage is sometimes called the *source*
or *producer*; the last stage, the *sink* or *consumer*.
*/

package main

func main() {

}
