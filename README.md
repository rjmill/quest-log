#Quest Log#

A quest tracker for your every day life.

This is an idea I've been playing with for a while now, and I figure it's
finally time to start building it with software.

I built the "prototype" for this in high school to manage my ADHD tendencies to
forget everything and loose track of what I was supposed to be doing. It's
changed a lot since then, but I still use the same basic workflow to great
effect to this day.


##Design##

The prototype consisted of a pen, sticky notes, and a smallish notebook. I'd
write out everything that I needed to do on sticky notes, and then organize the
sticky notes into "quests." Quests were just stacks of "subquests" (ie more
sticky notes), with the first one I could do on top, effectively hiding all the
todo list items I didn't yet need to concern myself with underneath them. If I
found myself having trouble getting started on that first subquest, I'd take
that subquest and break it down into more subquests. I'd go arbitrarily deep
with these nested subquests, sometimes to the point where writing down a
subquest on a sticky note took longer than actually accomplishing that subquest.

Another important aspect of my quest log prototype was that I almost never threw
away completed "quests". They went in their own section. At first, the idea was to
help motivate myself and give myself a pat on the back. After years of use, the
real benefit turned out to be that my completed quests had turned into
step-by-step notes and tutorials on how to do anything I'd ever used the quest
log for.

Currently, I'm using a plain text file to similar ends. The overall workflow is
about the same, but there are trade offs. On one hand, I type faster than I
write, I can grep through my old todos, and I don't have to leave my text editor
to update things. On the other, it's less tactile than sticky notes, and I have
less freedom to rearrange things to fit the bizzare whims of my mind.

The top design concerns for this project are simplicity and ease of use. It has
to be dead simple or I won't use it. My first step is to get to the point where
I can start dog fooding this. Pretty much all I need for that is some form of
database to keep state, and then a simple CLI for accessing it.

Ultimately, I'll want this to have at least two front ends: a CLI that I can use
to quickly dump out thoughts, and then a nice GUI I can use to rearrange things.
But first priority is the CLI since that's simpler, and I'll get more mileage
out of it anyway.
