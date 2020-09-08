const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Article = require("../models/Articles");
const HomepageLink = require("../models/HomepageLinks");
// const e = require("express");

router.get("/pages", (req, res) => {
  HomepageLink.find({}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json({links: data});
    }
  });
});

router.get("/page", (req, res) => {
  const id = req.query.id;
  Article.findById(id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
});




router.get("/create/page", (req, res) => {

const Skeleton = {
  title: "The New Manchester United: Building A Winning Squad",
author: "Ishan Sharma",
date: "July 4, 2019",
image:
  "https://imagesvc.timeincapp.com/v3/fan/image?url=https://bvbbuzz.com/wp-content/uploads/getty-images/2018/02/916641998-borussia-dortmund-v-hamburger-sv-bundesliga.jpg.jpg&",
sections: [
  {  paragraph: {
    text: `“I’d also like to remind you that when we had bad times here the club stood by me, all my staff stood by me, the players stood by me – your job now is to stand by our new manger. That is important.” – Sir Alex Ferguson`}}
  ,{paragraph: {
    text: `Before the greatest manager of our generation retired after making Manchester United one of the biggest football clubs in the world, he said this very important thing. With or without this quote, the fans have always been there for the managers during the highs and the lows. However, it wasn’t the same case with the board of directors for Manchester United. This problem didn’t just appear after Fergie retired. It was already evident when the board decided to replace one of the greatest Premier league performers back in his time, Cristiano Ronaldo with an ageing Michael Owen very much past his prime and 2 unknowns Obertan and Antonio Valencia. Post Fergie, our owners and the board have shown trend of splashing unnecessary money on bang average players and not identifying + addressing the very visible problems in the squad. Ed Woodward, who has the final say on transfers has been constantly disagreeing with managers in regard to transfers. Being a former banker and having that financial background, he obviously looks at the money the club can generate with a transfer rather than the footballing side of it.`
  }},
  {paragraph: {
    text: `That is why the first step to the Manchester United rebuild should’ve been a director of football. Someone like Overmars at Ajax or Monchi at Sevilla, who could identify the obvious problems in the squad and look at suitable targets that can solve that problem. The targets don’t have to be star players who draw a lot of attention towards them, they just have to be the right players. Manchester United are often focused on drawing in a star name rather than first analyzing if the player will fit into the squad or not and what he’ll bring into the team to solve the issues present there.`
  }},
  {paragraph: {
    text: `Hence, my article will focus on the issues which the Manchester United squad are currently facing and discuss the possible targets (both high profile and underrated) to make Manchester United a winning team again. 2 obvious issues in the squad, a backup left winger and a right back have already been solved till date with the signings of Daniel James from Swansea and Aaron Wan Bissaka from Crystal Palace so these 2 sections of the squad will not need further discussions.`
  }},
  {
    paragraph: {
      text: `Let us start with the most obvious problem in the Manchester United in the backline, a world class centre back who can partner with Victor Lindelof or Axel Tuanzebe in the future. United currently have 5 CBs Smalling, Jones, Lindelof, Bailly and Rojo (not considering Axel). Out of them only Lindelof has shown he can be trusted for playing every game next season. Bailly has incredible potential but his lackluster performances and frequent injuries make him too much of a risk to rely on. I don’t think there are any words left for Smalling, Jones and Rojo. That is why United must focus on signing a CB. There are many possible candidates with varying price ranges and quality (I’m already considering De Ligt has joined Juve because it is now almost sure). Breaking them down :`
    }
    
  },
  {subheading: `Kalidou Koulibaly, Napoli (28)`},
  {paragraph: {
    text: `This would be the dream. Koulibaly has been phenomenal for Napoli for almost 4 years now and has been Seria A’s best defender by a country mile. Not only is he a tall beast who can win almost every aerial duel, he is quick and agile that makes his blocks look like a piece of cake. Additionaly his ball playing ability is incredible which was statistically proven by the fact that he was the 2nd most accurate passer in whole of Serie A last season (he finished above Pjanic btw). However the cost of his transfer would exceed a 100 million euros and go upto 130-135 million that is if Napoli finally decide to sell him. Splashing this amount on Koulibaly wouldn’t be that bad of a decision as he is almost sure to immediately make our defence 10 times better (referring to how Van Dijk did the same for the Liverpool back 4). However, this will reduce our funds for investing on other sectors of the squad. Hence I personally think, United currently should look for a cheaper option because buying a centre back shouldn’t decelerate the investment on other sectors of the XI.`
  }},
  {img: {src: `https://thesportsrush.com/wp-content/uploads/2019/01/GettyImages-1087632968.jpg`, caption: ""}},
  {subheading: `Ruben Dias, Benfica (22)`},
  {paragraph: {
    text: `If United are looking for a signing to build a proper long term CB partnership, here is your guy. The young Portuguese won a lot of hearts with his UEFA Nations League finals performance but a lot of people that have been following him throughout the season know how critical his presence was in Benfica’s backline which secured the Portuguese league last season. Ruben’s plus points are that he is young, raw and still has a lot of years for learning from players and improving. Ruben is quick, his passing is very strong and he can play very accurate short passes. For a new Manchester United side who will obviously look to build attack from the back he will be critical. Partner him up with Lindelof, we will have 2 very good ball playing centre backs. He also doesn’t hesitate to put in tackles whenever necessary and is committed to doing his job in defence. He is a very good aerial threat in set pieces. Even though there are reports Benfica are working on increasing his release clause, his current price is just 32 million euros. If United manage to secure him for just this price, it will be a daylight robbery for sure. Plus we will have a lot of surplus to invest on other sectors in the squad.`
  }},
  {img: {src: `https://www.thesun.co.uk/wp-content/uploads/2019/05/NINTCHDBPICT000487208711-e1556890698588.jpg?w=width`, caption: ""}},
  {subheading: `Manuel Akanji, Borussia Dortmund (23)`},
  {paragraph: {
    text: `Akanji alerted a lot of United fans who had known and admired him by stating in an interview that Manchester United was his dream club and he wanted to play there. There are a lot of reasons United fans should be happy about Akanji if he does end up in United. First of all, Akanji brilliantly led a backline with a young Dan Axel Zagadou or Diallo alongside him. The main thing to note about Akanji is his ball playing ability. There are very few centre backs that are as comfortable with the ball as him. He also has incredible strength matched with unbelievable pace, something that rarely coexists in a CB. He can both outpace and outmuscle an opposition attacker, win aerial duels and quickly look to transition the possession won into attack. Manuel is very good at aggressively pressing the opposition from behind, making sure that it’s always the striker’s back that is turned towards goal. This type of aggressive pressing also results in quick loss of possession by the opposition. Akanji is not only good at giving quick short passes but can also provide pin-point long balls which is always needed when we play a pressing opposition. Icing on the cake, Akanji can play as both a centre back in a back 4, LCB in a back 3 or a right back. With the right team, Akanji is bound to be one of the best defenders in Europe and there is no better platform than Manchester United. He will also cost from 30 million euros to a maximum of 40 million euros, an excellent price tag for someone who is only going to get better with his football.`
  }},
  {img: {src: `https://imagesvc.timeincapp.com/v3/fan/image?url=https://bvbbuzz.com/wp-content/uploads/getty-images/2018/02/916641998-borussia-dortmund-v-hamburger-sv-bundesliga.jpg.jpg&`, caption: ""}},
  {subheading: `Harry Maguire, Leicester City (26)`},
  {paragraph: {
    text: `United have wanted him ever since he had a very decent performance at the PL 2 seasons ago + the 2018 World Cup. Harry is premier league proven and will have no problem adjusting into the United backline. Plus reports since the last year have been suggesting that he wants to play for United. Harry’s aerial ability is excellent in both defensive and offensive situations. Not only will he be blocking long balls and crosses, he will definitely be scoring goals in the other end. His ball playing ability has also looked decent. The problem with him is the incredibly inflated price tags English players have. There are reports suggesting Leicester can demand almost 75 million rising 80-90 million pounds for the Englishman. This can obviously put off the United board because even though Harry is a great CB without doubt, he is still not worth spending more money than Ayemeric Laporte for sure.`
  }},
  {img: {src: `https://www.independent.ie/sport/soccer/article38216393.ece/13e28/AUTOCROP/w620/ipanews_a98a3b96-6ad0-405f-a7c0-610cd61a1cdb_embedded242842531`, caption: ""}},
  {subheading: `Issa Diop, West Ham United (22)`},
  {paragraph: {
    text: `We all remember Issa from his solid performance against us which led to Jose Mourinho praising him in the post match interview. Issa has been the go-to CB for Manuel Pellegrini and being trusted by such an experienced senior manager to play 33 PL games last season shows the quality he possesses. Diop’s strengths are mainly related to his astonishing presence of mind during games. He just knows where you should be on the pitch and when you should be there. Plus he is known to step out of line to break up play, intercept and quickly look to transition the play into attack. His average ball playing ability can be a small issue but we must also not forget that he is just 22 and has a lot of time for improving these aspects of the game. There are reports that suggest West Ham are demanding more than 60 million pounds for him but if United really get in the negotiating table for him, I believe we can significantly lower the asking price and also maybe get a few of our own players into the deal (Jones, Rojo) so that they can be offloaded.`
  }},
  {subheading: `Toby Alderweireld, Tottenham (30)`},
  {paragraph: {
    text:`If none of these signings work, there is a proven Premier league CB who we can always go to. Although his age can be an issue for the club, Toby Alderweireld has consistently been one of the top 5 centre backs in the league since the past 3 or 4 years. His incredible aerial ability, his tackling, his pinpoint long balls from the back and his leadership qualities, something that is so much lacking in the United backline can help us solidify our CB situation for 2-3 years so that we have enough time to secure a more longterm target with proper scouting. The main thing that has attracted a lot of attention to his transfer is his price is just 25 million pounds as he enters the final year of his contract. This is incredibly cheap for someone of his quality.`
  }},
  {paragraph: {
    text:`The next sector of the squad that needs immediate fixing is the defensive midfield position. The only proper defensive midfielder United have is Nemanja Matic who hasn’t really been up to the standards set by himself at Chelsea. McTominay has been deployed in that position but is looking more convincing as a backup attacking midfielder rather than a starting DM. This is why United need to go to the market to buy a proper DM. There are few really good options in this position, breaking them down:`
  }},
  {subheading: `Ruben Neves, Wolves (22)`},
  {paragraph: {
    text:`Formerly the captain of Porto at a delicate age of 18 years, Ruben Neves was a steal even when Wolves signed him 2 years ago. The prolific Portuguese midfielder since then has been the starting point of every Wolverhampton attack and has caught the eye of many top teams. Neves is a midfielder that starts from deep and can spray passes in any form from the back. He can give pinpoint diagonals or balls through the channels to create quick counters which has been so integral to the Nuno Espirito Santos way of playing. He is also very strong with the ball and can hold up play in midfield to settle possession making him a great asset to both counter attacking systems and a possession based style of play. The deep lying midfielder also has a strong right foot that has and can score a number of wonder goals outside the box. As a whole, Neves is everything that United need but getting him looks close to impossible. Wolves will not let their main man go without a fight and at such a young age, he will probably cost United almost 70-90 million. This presents a huge transfer hassle that can waste a lot of precious time that can be spent on other players. Hence even though he is the best option, he is also one of the most unlikeliest players to join United this season.Related image`
  }},
  {subheading: `Wilfred Ndidi, Leicester City (22)`},
  {paragraph: {
    text:`After Leicester sold the most amazing defensive midfielders of our generation (Makelele has to be second) to Chelsea, they are lucky enough to have someone who isn’t up to the levels of Ngolo Kante but will definitely get there someday in his career. Wilfred Ndidi has been a revelation since his debut for Leicester 2 years ago. The Nigerian is a prolific ball winner. He has amazing stamina and can cover a lot of areas in the midfield. His main strength is his tackling ability which after Herrera’s departure will be an obvious missing point in the United midfield. The statistics generated by Ndidi’s performances show baffling results for someone who is just 22 years old. He has won the most tackles in the Premier league this season reaching a whopping total of 143 tackles (credit to Statman Dave). Ndidi will be great asset to both a 2 man double pivot or a 3 man midfield as a number 6 or someone operating between a number 6 and number 8. His presence of mind and concentration make him very much able to operate at the number 6 position for United. Apart from that, his price tag isn’t that high compared to Neves and United might just be able to secure his services at around 45 to 50 million.`
  }},
  {img: {src: `https://i0.wp.com/www1.pictures.zimbio.com/gi/Onyinye+Wilfred+Ndidi+Leicester+City+v+Huddersfield+_5XMQh6nM7ul.jpg`, caption: ""}},
  {subheading: `Sean Longstaff, Newcastle United (21)`},
  {paragraph: {
    text:`Dubbed as one of the best talents Newcastle’s academy has produced yet and the next Michael Carrick by some of the fans, Sean has been on the limelight ever since reports claimed United wanted to sign him. However all this seems pretty much justified looking at his performances on his debut season for someone who is just 21 years of age. Honestly, I admit all my writings about him are coming from his compilations I collected from Twitter and Youtube but you can see why Ole would want him to join United and why even Guardiola took time to compliment him. Sean operates from deep midfield and has the eye to pick passes to his teammates operating in the opposition half spaces or channels very confidently. He seems to command the area he operates in, making interceptions, getting into positions where he can immediately terminate an attacking threat, everything that our very own Michael used to do so effortlessly that we got used to all that. United very much lack the player who has a complete understanding of what is going on in front of him and make decisions accordingly. Buying him would mean the risks would be very low (because of the low cost and age) and the profits would be very high. I say that because we’d have a young midfielder that could replace an aging Matic and also be an inspiration for our own product Garner with whom he can develop a healthy competition for the DM spot in the upcoming years. He is being priced 25 million pounds by Newcastle but in my opinion he should only cost United around 15-20 million pounds if the negotiations are done correctly.`
  }},
  {img: {src: `https://talksport.com/wp-content/uploads/sites/5/2019/03/GettyImages-1085318976.jpg?strip=all&w=960&quality=100`, caption: ""}},
  {subheading: `Declan Rice, West Ham United (20)`},
  {paragraph: {
    text:`Rice has been the best young talent West Ham has produced this season. The versatile youngster who mainly plays as a DM but can also play backup CB caught the eye of pundits almost every game where he showed signs of a very bright future. This eventually led to his very well deserved England call-up and 34 appearances for his club. Rice is not only a very good passer, maintaining a higher than 80% accuracy almost every game (which is pretty obvious considering he plays alongside the very experienced Mark Noble) but he also a prolific ball winner making active interceptions in central midfield. His height makes him very suitable to win aerial duels and he shows that in the game too. This can be of great help against teams who sit deep and play long balls. However, Declan seems committed to staying at West Ham as he is in contention to become the future captain of that club which means it will be very hard to persuade him out of his beloved club. If he does decide to leave, it will cost United almost 45 million pounds to secure his services, a bargain if you look at his age and the talent he possesses.`
  }},
  {img: {src: `https://talksport.com/wp-content/uploads/sites/5/2018/09/RICE.jpg?strip=all&w=960&quality=100`, caption: ""}},
  {subheading: `Julian Weigl, Borussia Dortmund (23)`},
  {paragraph: {
    text:`Someone who should be mentioned in every conversation about a DM but isn’t, some people including me still can’t believe Weigl is just 23 and has given performances that startle even the best of midfielders. Maybe he isn’t as consistent and class like he was 1-2 years ago post injury but people tend to forget he has so much room for improvement with the amount of potential he has. Toni Kroos once called him a world class midfielder and considering the performances he’s delivered for Dortmund, there is no doubt Kroos was right. Weigl at a soft age of 21 was the heart of the Dortmund midfield making everything tick for them in such high intensity situations. He looks incredibly composed with the ball and maintained a 90 plus passing accuracy percentage for an entire season once, something that only the greats of our generation like Kroos manage to do. Weigl has an amazing ability to quickly transition from defense to attack and seems unmoved by any pressure presented to him. His remarkable composure with the ball will make him an important asset for United against high pressing oppositions. His ball winning ability and number of tackles won also show that he’s a complete defensive midfielder. The fact that Dortmund are willing to sell him for as low as 25 million euros should already be a stimulus for teams like United in search of a DM to make a bid.`
  }},
  {paragraph: {
    text:`After getting the defensive side of midfield sorted out, United still need a midfielder who can look forward and contribute towards the attack. A ball carrying midfielder who can pick passes and also has an eye for goal so that our attacks are not over-reliant on Pogba alone. Plus Pogba looks destined to leave next season if not this season so we must prepare our team to have a new creative outlet post Pogba’s departure. Fred has not convinced in that role at all and might only serve as a back-up CM for the upcoming season. There are a lot of people United can look to sign in this position, breaking them down :`
  }},
  {subheading: `Bruno Fernandes, Sporting (24)`},
  {paragraph: {
    text:`The man who grabbed all the headlines in the Portuguese league last season by reaching an incredible total of 33 goals and assists from midfield as a Sporting captain. There was an article in the Portuguese newspaper when he didn’t score for 3 games and responded to that by grabbing a hat-trick in the next game. Bruno is a prolific attacking midfielder who can pick a pass in key areas, look to carry the ball himself into those key areas, can dribble and control possession effectively in the opposition half space. The icing on top is that he has an eye for long range goals and is also a set piece specialist which can relieve a lot of pressure from Pogba and Rashford, who are the only proper right-footed freekick takers. He also likes tracking back from midfield to help out the DM which is something very important to prevent us from getting caught out during counters. Bruno will be an ideal signing for United and it looks very likely that we will get him after City backed out of the deal. Sporting reportedly want around 60-65 million euros for him which shouldn’t be a big deal considering the type of player we’re getting.`
  }},
  {img: {src: `https://cdn.vox-cdn.com/thumbor/5JEuvXZZGapM-8Vkf_XlXjvZiTQ=/0x0:3134x2236/1200x800/filters:focal(1483x522:1983x1022)/cdn.vox-cdn.com/uploads/chorus_image/image/64132041/1011700108.jpg.0.jpg`, caption: ""}},
  {subheading: `James Maddison, Leicester City (22)`},
  {paragraph: {
    text:`Ever since Maddison joined Leicester City for a mere 20 million pounds from Norwich, there weren’t that many people who thought he would be one of the most impressive creators in the Premier league. This young midfielder was the heart of almost all Leicester attacks and played a vital role in their impressive league finish this season. His ability to hold the ball well in the middle added with his solid dribbling plus an eye for goal makes him the go to guy if we cannot manage to land Bruno this season. James also likes to drift wide to provide crosses and seems to prefer giving lovely layoffs to his striking counterpart. He also managed to land 14 goals and assists this season in the league which is a great number considering the club he’s playing for. All in all, James ticks all the boxes to become our attacking midfielder plus being a young Englishman can be a plus point to Ole’s target of signing “young, talented and hungry Englishmen” this window. However, like many other English players his price is overly inflated to around 75 million pounds according to most reports which is huge for a player who has played in the top division for just a season. However, you cannot deny the talent that’s there for the taking.`
  }},
  {img: {src: `https://cdn.vox-cdn.com/thumbor/oEFI2IRTvRzN9UDaHjfkPo0BJVs=/0x0:3603x2460/1200x800/filters:focal(1514x942:2090x1518)/cdn.vox-cdn.com/uploads/chorus_image/image/63018041/1093590712.jpg.0.jpg`, caption: ""}},
  {subheading: `Giovani Lo Celso, Real Betis (23)`},
  {paragraph: {
    text:`Lo Celso is one of the most sought after midfielders this transfer window due to his release clause which is reported to be around 85-88 million pounds. There were many reported links with Spurs but with them recently confirming the very impressive transfer of Tanguy Ndombele means Lo Celso is there for the taking and there are reasons why United should look to take him. Lo Celso is a very talented attacking midfielder who has also played in both the wings in the past making him a very versatile player. Giovani first of all is a very able dribbler and will look to collect the ball in midfield then drive it forward into dangerous areas. He can also think quickly in the tightest of situations and make very good passes in those situations. You could think of him being almost press resistant considering the fact that Betis maintained the 2nd highest possession percentage in La Liga last season. The reason Lo Celso is so menacing is that he operates right between the opposition half spaces, making movements that confuse both midfielders and defenders as to who is supposed to mark him. From there he makes these lovely layoffs to wingers that are cutting in or the striker. Other than that he himself has an eye for goal scoring 12 goals in all competitions last season. As I mentioned above, he has a release clause of 85-88 million pounds but it can be negotiated to a lesser amount if proper talks are in place. If United do get him, it is sure that we’ll have a player with potential to be one of the best playmakers in the future.`
  }},
  {subheading: `Christian Eriksen, Tottenham (27)`},
  {paragraph: {
    text:`Even though Eriksen has quite publicly displayed his desire to join Real Madrid, the move seems less likely now that Real seem to have shifted their focus into a more younger target (Van de Beek). This can give United an opportunity to sign the Spurs star player. Eriksen is a proven Premier league player and has given consistent performances for Tottenham ever since he joined them in 2013. Eriksen mostly plays on the right side of a narrow front 3 or a number 10 but can be deployed as an AM or on the right when United play a 4-2-3-1. He is one of the best creative players in the league currently and is a class above everyone when it comes to his presence of mind to pick out a pass through or in the channels. His movement off the ball is excellent and his positioning during attacks is always pinpoint. Plus everyone knows how good his right foot is from outside the box or during set pieces which can help United present a different kind of threat to the opposition. Eriksen will be a secure signing for us because the chances of him living up to his expectations are very high. However, he is 27 years old and can only offer 2-3 seasons more of his current form. To add to that, he will probably cost more than 80 million pounds to almost 95-100 million pounds which can raise a few eyebrows.`
  }},
  {img: {src: `https://tottenham.ms.lastwordonsports.com/wp-content/uploads/sites/22/2019/06/christian-eriksen.jpg`, caption: ""}},
  {subheading: `Paulo Dybala, Juventus (25)`},
  {paragraph: {
    text:`If there ever was a better time to sign Dybala, this is the time. The Juve attacking midfielder can be out of Sarri’s plans and has been a very average performer for Juve this season considering his true potential making his price tag significantly lower. Dybala is a proper number 10 but can operate effectively in the right half space and is always looking to drift into the middle. His dribbling skills + exceptional pace help him take on defenders and allow him to either beat them or create spaces for other players to facilitate an attack. Paulo is a very intelligent player, knows where he should be during attacks and can operate even in the tightest of spaces. His left foot works wonders from outside the box or from free kicks meaning that we would also have a proper free kick taker from the right. Dybala could very much fit into the middle or the right of a narrow attacking 3 and even give an option to Ole to deploy him as a false 9 in a front 3 alongside Rashford + Martial (or the right winger we hopefully manage to land). Dybala is a proven player who has shown he can play in the highest of levels by his performances in the Champions league knockout stages against big teams like Barcelona. He is very much gettable for a fee of around 75 million euros or if United do manage to sell Pogba to Juve, he can be bought as a part of the deal.`
  }},
  {img: {src: `https://metro.co.uk/wp-content/uploads/2019/05/SEI_67036156.jpg?quality=90&strip=all`, caption: ""}},
  {paragraph: {
    text:`Another position that has been crying for a reinforcement even since Nani left is the right wing. United have 0 right wingers in the squad, with players like Mata (an AM or 10), Rashford (a ST), Lingard (an AM) playing that position. The transfer of Daniel James does give United an option to deploy him there but his more natural position is on the LW and not the RW hence United need to look for a winger, breaking them down :`
  }},
  {subheading: `Jadon Sancho, Borussia Dortmund (19)`},
  {paragraph: {
    text:`Sancho was not only one of the players of the season for Dortmund but also for the entire Bundesliga. At an age of 17 when most players play youth level or reserve team football, Jadon went from his home to Germany and played in one of the most toughest leagues in such a young age. Not only has he performed at the highest level last season gathering a sensational 12 goals and 14 assists playing as a right sided attacker in a 4-2-3-1. However these numbers are just not enough to define him, you need to watch him play to witness what a phenomenon he is. Sancho has pace, trickery, creativity, flair and an eye for goal. He can outrun almost any defender which is very useful during counters. His knack for trickery is bound to make the Stretford End go nuts. The most important aspects of his game though are his creativity and his eye for goal. After he’s collected the ball on the right, Sancho is always looking for movement up ahead of him so that he can pick a pass and boy does he pick passes. His incredible assist tally plus the number of key passes per game is unreal considering his age. Not only that, Sancho can score goals too and he is always looking to position himself so that scoring opportunities are made for him. Plus he has a lot of aspects in his game that he can improve on in his upcoming career, which makes him a player to go after. However the transfer is not easy, Sancho obviously wants Champions league football which currently United cannot offer. Also the Dortmund board do not want to sell him this season at any cost raising further complications for the transfer. However United can target to get him next summer window after they hopefully manage to secure CL football this season. Sancho will surely cost more than 100 million pounds be it this season or next season so United will really have to break the bank to sign him but for a player like him, he’ll surely be worth every penny.`
  }},
  {img: {src: `https://talksport.com/wp-content/uploads/sites/5/2019/02/GettyImages-1124720281.jpg?strip=all&w=960&quality=100`, caption: ""}},
  {subheading: `Nicolas Pepe, Losc Lille (24)`},
  {paragraph: {
    text:`Pepe surely is one of the most exciting players ever to play in Lille after Eden Hazard. One of the stars of Ligue 1 this season, Nicolas has terrorized almost every defence in the league (including PSG because it needs mentioning) with his immense pace and goal scoring ability. From the right wing last season, Pepe scored 22 goals and assisted 11 which are astonishing numbers for a winger. This number is a result of his ability to dribble through players to try a shot from his left foot which has a relative knack for long range shots. Also his tendency to cut inside and provide space on the overlap or get into the box to pick a pass justifies his assist tally. Numbers aside Nicolas is a very confident player who can make intelligent runs, take on defenders and also create space for other players to work on. Overall United would have a proper winger at the right flank which can provide both width or cut inside to create space for the overlaps, something they’ve been lacking since Nani. He will cost around 50-75 million euros and is keen to leave Lille this season and for that price I personally think this will be a very reasonable signing if we really want to strengthen this position.`
  }},
  {img: {src: `https://sm.imgix.net/19/26/nicolas-pepe.jpg?w=640&h=480&auto=compress,format&fit=clip`, caption: ""}},
  {subheading: `Federico Chiesa, Fiorentina (21)`},
  {paragraph: {
    text:`ne of the most exciting young player in the Serie A this season, Chiesa was excellent despite Fiorentina’s poor performance in the Serie A. Chiesa put on performance after performance playing with versatility clearly shown by the fact that he’s played in all of the attacking positions (RW, CF, LW and AM). Sometimes Fiorentina’s game just looked like a one man show with him running almost everything in attack. Chiesa is an ingenious attacker who is quick, has a magical first touch and pick wonderful through balls when he’s operating a bit deeper. He can also provide the necessary width and is very comfortable operating on the flanks as he is very quick. His preference for dribbling the ball rather than working through short passes can make his game even more exciting something that United surely lack in the right flank. There might be questions as to if he can adapt to top levels in the Premier league but the fact that Manchini gave him so many caps for the Italian National side shows he doesn’t fumble under pressure. His performance in the U-21 World Cup that happened recently was also applauded by everyone. Overall Chiesa would cost around 65 million euros although Fiorentina is bound to ask for more because he’s their star man. Getting him would mean we would possess one of the most talented Italian youngster which isn’t a bad thing at all.`
  }},
  {subheading: `Hakim Ziyech, Ajax Amsterdam (26)`},
  {paragraph: {
    text:`If anyone hadn’t noticed this Moroccan sensation 2 seasons ago, they most surely did this year with Ziyech having a tournament of his life in the CL. Not only in the CL, he also scored 16 goals and created 13 in the Eredivisie for an Ajax team loaded with so many creative players. He was involved in an unexpectedly successful season Ajax had both domestically and in Europe. Ziyech is someone who brings the spotlight along with him when he plays and can mesmerize you with his attacking moves. He is very strong even though he looks skinny and can shield off almost anyone from the ball. The way his left foot works reminds us of the prime Mahrez during the title winning Leceister season but there is also an individuality in the way he plays. He almost always starts wide, collecting the ball from midfield, drives it forward and cuts into the box to unleash a lethal shot into the goal or he just effortlessly lays it off to his teammates. Ziyech plays with an attitude and ego of a star which can be a very good confidence booster for his teammates. This attitude is also necessary to some extent from a player if he’s to play for a team like United (referring to the likes of Roy Keane, Ronaldo, Giggs). Ziyech is a big game player which he’s shown with key performances against the likes of Real Madrid, Juventus and Tottenham. Ziyech also likes tracking back and helping his team out defensively using his strength+pace. His price tag is another reason we should immediately look to sign him, as he is available this summer for a mere 30 million euros and has only been approached by Sevilla till now, a club he doesn’t intend to join. There is absolutely no reason why United shouldn’t be all over this right now.`
  }},
  {img: {src: `https://imagesvc.timeincapp.com/v3/fan/image?url=https://bayernstrikes.com/wp-content/uploads/getty-images/2017/07/1134125515.jpeg&`, caption: ""}},
  {subheading: `Hirving Lozano, PSV (23) `},
  {paragraph: {
    text:`Lozano came into picture from his amazing displays in the 2018 World Cup playing for Mexico. Against Germany he gave a man of the match performance, completely terrorizing the German backline with his raw pace and trickery. Not only for his country, he is one of the principle goal threats for his club PSV scoring an impressive total of 17 goals and 8 assists in just 30 appearances from the flanks. Lozano is also looking forward to playing in the premier league, holding off interest from the likes of Napoli. The advantage of buying Lozano is that he is comfortable playing as both a left winger and a right winger. This will give United an option deploy him at left wing when required. Lozano has breathtaking pace and will take on defenders creating space for others to work on. He also has preference to play wide and doesn’t always cut inside, providing width in the right flank so that the right fullback can make underlaps or sit deep to defend. As United have a more defense minded fullback (Wan Bissaka), this can be helpful to him because he will not have the pressure to overlap during each attack. Lozano is another winger in this list who is very strong and physical so he can provide that physicality to the attack which can be a big psychological factor to the opponent. Lozano will be a very decent buy for United because he will cost just 35-40 million euros and is sure to improve a lot in the way he plays because he’s still young.`
  }},
  {img: {src: `https://cdn.vox-cdn.com/thumbor/9dIGplfDDqBKxZgz0lMgX2tmsPQ=/0x0:5472x3648/1200x800/filters:focal(2299x1387:3173x2261)/cdn.vox-cdn.com/uploads/chorus_image/image/62939691/1066836894.jpg.0.jpg`, caption: ""}},
  {paragraph: {
    text:`So with these the high priority positions for United that need immediate strengthening (CB, CM, AM, RW) have been addressed. However, I personally think United should pursue a centre forward as it is getting more likely that Lukaku will be sold to Inter this summer and a left back to provide healthy competition to Luke Shaw so that we are not over reliant on one player.`
  }},
  {paragraph: {
    text:`The CF position has 2 candidates this season, Romelu Lukaku and Marcus Rashford. Rashford has recently signed a new long term contract with United which means he’s here to stay. Solksjaer has also made it clear that he wants to give Mason Greenwood a shot at the first team this season. With Lukaku destined to leave, it’s good that we’ll have 2 very talented young strikers in our squad but if can they be fully relied upon this season is still a big question. There are a lot of question marks for Rashford’s ability to perform as a regular striker (which means scoring at least 20 goals a season) and Greenwood turns 18 this year which means even with his potential, he’s just incredibly raw. That does present a need to sign a CF this season who doesn’t necessarily have to be a star signing but someone who can provide another option to the coach and also give competition to Rashford. Breaking down the targets :`
  }},
  {subheading: `Wissam Ben Yedder, Sevilla (28)`},
  {paragraph: {
    text:`Ben Yedder hasn’t always been associated with good memories at Old Trafford, considering he came off the bench, scored 2 goals and knocked United out of the Champions league two seasons ago but that just shows you how much of an impact player he is. Whether he’s starting or coming off the bench, Ben Yedder is always looking to score goals and he almost always succeeds in that mission. He scored 19 goals and created 9 in this La Liga season which is a very decent number for someone who plays in a club like Sevilla. Even though he’s relatively short compared to the typical tall strikers, he is still very quick and his finishing is clinical. His low centre of gravity means he can dribble the ball very well and can get out of tight situations even when defenders are marking him. He can also hold up play to provide passes for runners on either side. One thing about Ben Yedder is that he is a big game player beyond any doubt. This is shown by his impressive Champions league goal tally of 10 in just 14 games. Ben Yedder can be a great mentor for younger strikers like Rashford and he can be a great asset to the squad. We will always have a reliable attacking option when Rashford and Greenwood can’t perform to expected standards. He is also available for around 35-40 million euros, which is very much justified for a striker as good as him.`
  }},
  {img: {src: `https://i.dailymail.co.uk/1s/2019/06/26/08/15266790-7182553-image-a-2_1561533908231.jpg`, caption: ""}},
  {subheading: `Lautaro Martinez, Inter Milan (21)`},
  {paragraph: {
    text:`With Icardi having a very on and off relationship with his club and Luciano Spaletti which led to him being left out of a lot of games this season, Lautaro rose to the occasion and even though he couldn’t perform as good as the Argentinian talisman, he still impressed a lot of people. His performance also gifted him a place in the Argentinian national squad currently competing in the Copa America. Lautaro is a very energetic striker and already gives glimpses of a much older Argentinian striker Sergio Aguero. Like Aguero he has a lethal right foot which he doesn’t shy out from using outside the box. His dribbling is quality and add that to his pace, it directly increases his chances of beating a defender. United will obviously be a pressing team next season because of Ole’s preference of closing down his opposition meaning United could do a lot with Lautaro. His pace and his stamina will help United close down opposition centre backs when they look to play out from the back. Lautaro can cost around 30-35 million pounds if United approach him but we already have an advantage on Inter as they are looking to buy Lukaku. We can include Lautaro in a player plus cash deal of around 35 million + Lautaro, which will be an amazing business from our side as we can offload someone who wants to leave the club and also get a much younger talented striker plus some extra cash.`
  }},
  {img: {src: `https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/06/30/15619098823348.jpg`, caption: ""}},
  {subheading: `Yussuf Poulsen, RB Leipzig (25)`},
  {paragraph: {
    text:`Even though a lot of limelight in the Leipzig attack-line goes to Timo Werner who will surely be pursued and bought by Bayern, in this season or the seasons to come, people rarely notice Yussuf who operates alongside Timo and puts up a lot of decent attacking performances. The advantage of having Yussuf in the squad is he can play as both a striker or a second striker which means he will be the man to go for if Ole wants to use a 4-4-2 diamond formation, which he used a lot last season during key games. Yussuf thrives in the second striker role and scored 15 goals last season which is an amazing number for someone who isn’t an out and out striker. Poulsen’s game focuses on not only scoring goals but more importantly holding up the ball and allowing runners to move forward so that they can score goals. He is a selfless worker and he will always look to pick a pass or help out his other striker or AM. The effort he puts on the pitch is very much visible as he not only helps out in the box but drops deep to link-up play and looks to layoff long balls to the 2nd man as Leipzig mostly play that way. He is also a relentless presser and will literally go anywhere to press his opposition. Yussuf can perfectly fit into United if he is deployed with Rashford or Martial or Greenwood this season, he will help them score goals and help the team create attacking moves by giving a different approach to the play. In an era of football when most players are concerned about their individual records, a selfless player like Yussuf will be a gem of a signing. I also think Leipzig can likely be lured by an offer of around 35-40 million euros which is not bad at all considering the type of player we’re getting.`
  }},
  {subheading: `Sebastien Haller, Eintracht Frankfurt (25)`},
  {paragraph: {
    text:`In a window where a lot of attention went to Luka Jovic after he signed for Real Madrid, there is another player in that Frankfurt front 3 that deserves a lot of attention for his input. In just 23 appearances for Eintracht this season, Haller was able to bag an impressive total of 15 goals and 9 assists even though Jovic and Rebic were the ones getting all the headlines. Goals aren’t only the only thing that makes Haller a special player, he is very intelligent and can perfectly adjust to tactical changes made by the coach. Being 6’3 and having a very good jump means his aerial ability is excellent. Add this to his hold up play and we have ourselves a target man. He is a very obvious upgrade to Lukaku because his ball control + touches in tight situations is brilliant. This can be very useful in maintaining possession and also bypassing an opposition press by throwing long balls at him. Haller, for someone who is that tall is very flexible and can receive the ball with his back in goal then quickly turn around to create a shooting chance for himself. He can work brilliantly if he has 2 runners (like United have Rashford, Martial, Lingard, James) as he can drop deep to hold play and then give layoffs and through balls to them very effectively. His passing ability and surprisingly his crossing ability is also very good, something very much necessary if a fluid front 3 is to be played. Add that to his amazing positional sense, Haller can be a huge aerial threat if the right crosses are provided. Haller can be bought for around 40 million euros which is great for someone almost more than a like-to-like replacement for Lukaku.`
  }},
  {img: {src: `https://statics.sportskeeda.com/editor/2019/03/53db2-15523569764584-800.jpg`, caption: ""}},
  {paragraph: {
    text:`As I’ve mentioned, United should also look to strengthen the left fullback position. Even though Luke Shaw has been very good since last season, his previous run of inconsistency and the fact that he’s still injury prone after the double fracture means there needs to be a backup who will also give him competition. If we are to compete at the highest level, we need competition for our players so that they too can perform to that standard. There are a lot of talented left backs around, breaking them down :`
  }},
  {subheading: `Kieran Tierney, Celtic (22)`},
  {paragraph: {
    text:`Tierney is surely one of the most exciting young players the Scottish league has to offer. For someone who is just 22, the versatility and confidence he shows in his football is something much more experienced fullbacks lack. Talking of versatility, Tierney can play as a traditional left back who will sit back, defend and make overlaps when needed or he can play as a left wing back in a back 3 and take control of the entire left flank. He does this because of his incredible stamina and speed. His decision making in high paced situations is something to make note of. He also has an eye for a pass and always looks up for runs made by the forwards or midfielders so that he can pick them out in space. His crossing stats are also very impressive. Talking of space, he himself makes runs into spaces whenever they appear, sometimes to free up space for his attackers by shifting the backline towards him. His attacking strengths are as good as his defensive abilities. He is very composed, solid and has a massive work rate which has resulted in drawing up valid comparisons between him and his fellow Scotland teammate Robertson. Tierney is currently being targeted by Arsenal but as their budget is limited and they’re also looking to sign other players, United can use this to their advantage. Additionally, Tierney will only cost up to 20 million pounds and for someone so young this is a very decent price.`
  }},
  {img: {src: `https://talksport.com/wp-content/uploads/sites/5/2019/04/GettyImages-1025590988.jpg?strip=all&w=960&quality=100`, caption: ""}},
  {subheading: `Alex Telles, Porto (26)`},
  {paragraph: {
    text:`Telles has been a consistent performer for Porto ever since he joined them in 2016. The experienced Brazil born fullback can play as a left back, left wing back and as a left winger. Looking at a few of his performances in the champions league, we can clearly see that Telles’ crossing ability is very noteworthy. This is something that is lacking in United’s fullbacks resulting in lesser service to strikers like Lukaku who thrive on such crosses. Telles is a very attack minded fullback with pace and intelligence. He knows when to make runs, where he should be making those runs and also prefers to play short passes with fellow midfielders or wingers to create attacking plays. He can also hold the ball very well. One thing I’ve noticed in Telles’ play is that he is very calm when his team is under pressure and doesn’t look to dive directly into tackles. With Telles in the team, Luke Shaw will have someone he can learn a lot from and develop into a better player. Telles will however cost 35-40 million euros which raises the question as to if we can really spend such amounts on a position that is already somewhat sorted.`
  }},
  {img: {src: `https://img.bleacherreport.net/img/images/photos/003/770/919/hi-res-6a2ef5299e6a31fc37cffaa2a98ae761_crop_north.jpg?h=533&w=800&q=70&crop_x=center&crop_y=top`, caption: ""}},
  {subheading: `Alejandro Grimaldo, Benfica (23)`},
  {paragraph: {
    text:`Often quoted has one of the most wanted left backs in the Portugese league (no offence to Telles), Grimaldo joined Benfica from the Barca youth ranks and he hasn’t looked back since then. Ever since he joined Benfica, he has already played 70 times for them showing how much trust he’s garnered there. But why is Grimaldo so special? The main aspect of Grimaldo’s game that impresses a lot of people is his passing. His passing ability is absolutely world class (and pretty obvious too since he joined from Barcelona). This can be handy for United who will obviously look to play out from the back next season in most games, they would love someone who is very comfortable with the ball. Being comfortable with the ball also means he can dribble very well, taking on opposition pressers and beating them to create space. The pinpoint passing isn’t just restricted to short passes, his crossing ability is also excellent. Another aspect of his game that he probably brings from experience in the Barcelona youth ranks is his in-game intelligence and positioning sense. Something that a lot of full backs lack, he has almost mastered that art. Grimaldo will be amazing for United, he can develop into an even better player alongside Shaw. He will however also cost around 35 million euros considering that he’s wanted by many other teams.`
  }},
  {img: {src: `https://futaa.com/images/full/nintchdbpict000361620802.jpg`, caption: ""}},
  {subheading: `Junior Firpo, Real Betis (22)`},
  {paragraph: {
    text:`Firpo is a young fullback from Real Betis who came into the picture just this season. The young attack minded fullback was apparently scouted by Manchester United who were initially thought to be scouting Lo Celso in a Betis game. There are reasons for interest, Firpo is an explosive attacking fullback who can also play as a winger (like Dalot). He is a physical player who can win a lot of aerial duels (something Shaw lacks due to his height) and is also very comfortable with the ball. He has a very decent passing skillset (has a preference for through balls) and crossing ability. He is very solid defensively and will surely look to give a tight competition to Shaw once he arrives here. Firpo can be a very good addition to the United squad, he is young, extremely talented and will look to improve a lot in the coming years. There are reports of Betis wanting more than 40 million euros for him but I don’t think he will cost that much if United really try and negotiate (can be acquired for around 20-25 million euros.`
  }},
  {img: {src: `https://media.minutemediacdn.com/process?url=https%3A%2F%2F90min-images-original.s3.amazonaws.com%2Fproduction%2Freal-betis-balompie-v-rayo-vallecano-de-madrid-la-liga-5c29f15ee43713e20e000001.jpg&filters%5Bcrop%5D%5Bw%5D=0.9145907251789605&filters%5Bcrop%5D%5Bh%5D=0.9971428571428571&filters%5Bcrop%5D%5Bo_x%5D=0.0&filters%5Bcrop%5D%5Bo_y%5D=0.0&filters%5Bquality%5D%5Btarget%5D=80&type=.jpg&filters%5Bresize%5D%5Bw%5D=630&filters%5Bresize%5D%5Bh%5D=472`, caption: ""}},
  {paragraph: {
    text:`All these targets are in my opinion a good fit for the United squad in both short term and long term goal of achieving a league title and competing for a good finish in Europe. All this achievement still doesn’t downsize the need for a technical director and retaining players in our current squad who are important for the future + releasing the deadwood. Players like David De Gea, Tuanzebe, Dean Henderson, Greenwood, Chong, Garner need to be given long term contracts so that they’re part of this project. Also deadwood like Darmian, Jones and most preferably Alexis Sanchez should be sold so that his huge wage bills aren’t something that stops us from buying talented players in the future. As to director to football, I personally think we should get an experienced candidate rather than giving this huge responsibility to an inexperienced former player. Manchester United in a state of transition require someone with experience on how to run the club, recognize the players that fit the club well, negotiate with agents, make connections and also give contracts to the players that deserve them. Manchester United is one of the biggest club in the world, so I don’t know why they should be looking to get the best directors of football in the world. Paul Mitchell, currently the director of football for Leipzig is known for recognizing talented players and help building great squads (Pochhetino’s Southampton + RB Leipzig). I can’t think of a better candidate than him for this role, plus I think he’d gladly accept an offer from a club like Manchester United.`
  }},
  {paragraph: {
    text:`If United work as a proper unit, with a defined structuring and support from its owners, the club can go back to being the best in a relatively shorter time than other teams. This is because United have adequate resources to do the job, something most of the other teams lack. As a fan, the only thing I want is for my club to be back to its best and challenge for every Premier league title for the years to come.`
  }},
  ]
}

const article = new Article({
  title: Skeleton.title,
  author: Skeleton.author,
  date: Skeleton.date,
  image: Skeleton.image,
  sections: Skeleton.sections,
});

article.save((err, data) => {
  if (err) {
    res.send(err);
  } else {
    res.json(data);
  }
});
});


router.post("/create", (req, res) => {

  const homepageLink = new HomepageLink({
    title: req.title,
    author: req.author,
    date: req.date,
    image: req.image,
    description: req.description,
    to: req.to,
    LinkType: req.LinkType,
  });

  homepageLink.save((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
});

router.post("/create/page", (req, res) => {
  const article = new Article({
    title: req.title,
    author: req.author,
    date: req.date,
    image: req.image,
    sections: req.sections,
  });

  article.save((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
});
module.exports = router;
