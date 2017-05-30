---
layout: post
title: "Stop putting of your decisions"
date: 2013-06-24 23:20:58 -0300
categories: decision procrastination
---
Making decisions is often a difficult task for me. It's common for me to get
stuck on simple decisions that aren't so important such as "Which movie should
I watch?". It's even worse when the decision is important -- I can take days to
decide.

While talking with some friends about it, I noticed that this **decision
making bullshit** is much more common than I thought and almost all of
them have no idea how to handle it. Here's an interesting excerpt from
Psychology Today:

> "Chocolate or strawberry? Life or death? **We make tons of quick decisions
> unconsciously; others we hem and haw over in agony.** We choose actions and
> form opinions via mental processes which are influenced by biases, reason,
> emotions, and memories. [Some question](https://goo.gl/weUgDU) whether we
> really even have free will; [others believe](https://goo.gl/nmEXYp) it is
> well within our power to make choices that will lead to greater well-being."

So, we can say that two behaviors are quite common on decision making: the
**quick decisions** --- which are often done unconsciously, influenced by
biases, reason, emotions, and memories --- and the **hard decisions** --- where
time spent can be a major problem. Although we don't want to waste time in our
decisions, making them unconsciously is not the way to go. We really need an
efficient and effective way to decide.

There are numerous techniques to help the decision making process. I've tried
some of them, but none was as fast as I wanted. For instance, a simple and
quite common approach is the
[weighted list of pros and cons](https://goo.gl/eYB2rW). It's an interesting
idea and often helps to make smarter decisions. However, I find writing pros
and cons on paper and assigning weights **annoying and very time consuming**
tasks. In addition, the more information we have about our question, the more
difficult it is to synthesize them and make the decision. I think this kind of
strategy is only worthwhile in very important decisions, where time spent is
not a problem.

## The timeout strategy

The solution to stop wasting time with our decisions came up to me while
chatting with a friend, who said: **"Whenever I find myself stuck with a
decision, I define a timeout. So, I think about the question during that time
and when the time runs out, I decide based on what I thought"**. As crazy as it
may sound, it really works! It is efficient and effective. You just need to
focus, think during some time and decide. Simple as that.

## Making decisions better and faster

The timeout strategy isn't all we need. The list of pros and cons has a big
advantage that should be noted. Despite time consuming, writing our previous
thoughts on paper lets us forget about them for a while and focus only on
adding new thoughts to our decision. We just need a faster way to make these
records. A simple solution is to **keep a score for each option during the
decision time**. That is, instead of describing each reason that you think of
with text, for every new reason that comes up you just increase the score of
the option which it benefits.

**We can also decide faster by adding a confidence threshold to our decision
model** -- which is a value between 0% and 100%. Consider a confidence
threshold of 80% and a question with three options. Thus, even if the time
limit is not over yet, if some option has at least 80% of the votes, the
decision can be made. Of course, we also need to define a minimum number of
votes, so that no decision can be made with a small number of votes.

To demonstrate that ideia, I built a prototype called
[DecMac](http://dmoraes.org/projects/decmac/). I made it in just six hours, so
it still can be improved in many aspects. But it works! You just need to set
the timeout, the decision threshold, and the minimum number of votes.  After
that, just add the possible options for your decision and, for every new reason
that comes up to your mind, increase the score of the option which it benefits
just by clicking on its button. Try it and let me know your thoughts about it.

If you want to contribute, the code is available on
[GitHub](https://github.com/danielmoraes/decmac).
