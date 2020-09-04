const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

const Skeleton = {
  title: "England’s midfield – A pleasant headache for Southgate",
  author: "Ishan Sharma",
  date: "May 4, 2020",
  image: "https://i.dailymail.co.uk/1s/2020/03/01/16/25393364-0-image-a-6_1583078778301.jpg",
  sections: [
    {
      paragraph: {
        text:
          "You must’ve seen that meme where DJ Khalid, hands on head is frowning and below it’s written “suffering from success”. That’s probably what Gareth Southgate is feeling right now. This isn’t the first time we’ve seen this happen though, more recently there was a time when Sven Goran Eriksson had to decide between Gerrard, Lampard and Scholes and he decided to avoid the headache entirely by playing all 3 in a very VERY flat 4-4-2.We all saw how that worked out for England."
      },
    },
    {
      image: {
        src:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/ENG-SUI_2004-06-17.svg/300px-ENG-SUI_2004-06-17.svg.png",
        caption:
          "The infamous Sven Goran 4-4-2 with Lampard, Scholes, Gerrard, Beckham in a midfield 4.",
      },
    },
    {
      paragraph: {
        text:
          "Clearly that is not something Gareth Southgate would like to replicate but before him now is an even harder task than this. There was already so much buzz about who England would take for the 2020 Euros and this time it was very difficult to predict who Southgate preferred. The postponement of the tournament to 2021 doesn’t make things better for him because an additional season means additional players and yet another dilemma. You only can take 23 players to a tournament and you just can’t take 23 midfielders with you."
      },
    },

    {
      paragraph: {
        text:
          "The most recent major tournament England played in was the 2019 UEFA Nations league semifinals where they lost 3-1 against the Dutch. Southgate opted for a 4-3-3 and the midfield 3 consisted of Rice, Delph and Barkley. Before that in the 2018 World Cup, Southgate played a 3-4-1-2 where Henderson would either partner up with Dier or Loftus Cheek and the number 10 spot would be occupied by one of Alli or Lingard. If you look at this team from the present context, the only players you might see in the Euro 2021 squad are Rice, Loftus Cheek, Alli and Henderson unless one of the others has a miraculous turn in their football."
      },
    },
    {
      paragraph: {
        text:
          "See this is what I’m talking about, an entire generation of English midfielders have already declined or they will once we reach the Euros. The fresh crop of exciting young midfielders is certainly a good sign but as previous tournaments have shown, the problem with England isn’t that they don’t have enough good players but it’s striking the balance between these group of players. So let us look at the options Southgate has and figure out a way forward."
      },
    },
    {
      image: {
        src:
          "https://www.telegraph.co.uk/content/dam/men/2018/06/25/TELEMMGLPICT000166795188_trans_NvBQzQNjv4BqC_LLCXkS_z-CZqgOMP7BeyU4lV_0mVXB1lDoTPTC-cU.jpeg?imwidth=450",
        caption: "England manager Gareth Southgate.",
      },
    },
    {
      subheading: "Defensive Midfield ",
    },
    {
      paragraph: {
        text:
          "Southgate in his recent games has already given debuts to a lot of young players, Declan Rice is one of them. The young West Ham lad is a robust defensive midfielder who is focused, determined and certainly captain material in the long run. Rice had a stellar season for West Ham consistently being the standout performer in a very dysfunctional midfield where he partnered alongside the old Mark Noble. Rice was previously a centre back so his tackling, aerial ability and break up play is exceptional. With Dier clearly on a decline, Rice is the only “pure” defensive midfielder Southgate has in his team. However, there are a few limitations to his play. Being a centre back previously, his ability on the ball is not that good. So without someone to partner alongside him in midfield, he can’t really work as the sole number 6 that can distribute passes forward and link defence to attack."
      },
    },
    {
      paragraph: {
        text:
          "With football evolving, the lines between positions have blurred. The striker can drop deep to link play, the fullback can stay up to attack and defensive midfielders don’t just sit back and intercept. They are expected to dictate play, bring the ball forward and be the link between defence and attack."
      },
    },
    {
      paragraph: {
        text:
          "The better option for doing that is another youngster, Harry Winks. Southgate has tried out a variety of formations recently but he seems to prefer the 4-3-3 more than the 4-2-3-1. The formation debate will come again later but during a tournament, he has to stick with one formation. For me, 4-3-3 is the way forward for England and that means Harry Winks is my obvious preference. Winks broke the scene 2 seasons ago as this short lad who had the brains of a mature midfielder. Last season (2018/19), Winks was injured a lot of times but whenever he played he showed promise. Under Pochhetino, Winks made sure no one at Spurs missed the ageing Dembele. Carrying the ball forward from defence, this boy was quick and technical. His movements were well thought and he had the eye for a pass. He was a progressor of the ball with infinite energy. He made so many runs throughout games and he always preferred progressive passes over just plain sideways passes. His unique ability to dribble makes him very versatile such that he could play anywhere across the midfield, even as a 10 but his best came as the central midfielder."
      },
    },
    {
      image: {
        src:
          "https://i.dailymail.co.uk/1s/2020/03/01/16/25393364-0-image-a-6_1583078778301.jpg",
        caption:
          "Harry Winks, the young and talented deep lying midfielder from Tottenham",
      },
    },
    {
      paragraph: {
        text:
          "There isn’t any denying, Winks is the way forward for England. It’s not that simple because he is very injury prone and now with Jose around, he doesn’t seem to be preferred over the clearly more admired Eric Dier. Choosing him is making a tough call but it’s a call that can really take England forward to a positive direction."
      },
    },

    {
      subheading: "The Balancing Act",
    },
    {
      paragraph: {
        text:
          "As I’ve said, playing a functional midfield is creating a balance between the players. Be it a double pivot with a 10 or a midfield 3, there needs to be balance. Otherwise it can go Sven Goran Eriksson very quickly. So where does the balance lie? With a technically gifted player like Winks behind you, you need a more robust physical player who doesn’t mind sitting deep and distributing if Winks dribbles forward but is also able to do it himself if Winks is pinned back. England already have someone of that nature in their team, Jordan Henderson. Henderson had a spectacular season with Liverpool before his injury. He is an orthodox box-to-box midfielder, who prefers moving forward rather than dropping deep. Dropping deep is something he has been doing whenever he’s deployed in the number 6 role for England or Liverpool but Winks clearly is far more superior in that aspect. Henderson is defensively sound because of his physical build and doesn’t mind them direct balls to the final third, something that provides a different dimension to the English attack whenever the patient passing play doesn’t work. Plus Henderson is the captain of Liverpool meaning he is a proven leader, something the national side direly need."
      },
    },
    {
      image: {
        src:
          "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F3e7cf9fc-75a6-11ea-be30-097bd8237f0d.jpg?crop=2796%2C1573%2C0%2C0&resize=1180",
        caption: "Jordan Henderson, the captain of Liverpool.",
      },
    },
    {
      paragraph: {
        text:
          "Henderson would surely be Southgate’s choice for the other central midfield position but we must also shed light that he will be around 31 when the Euros start. Not generalizing but that is an age where midfielders start losing their legs and makes you wonder what the other options are. Let’s at least consider them."
      },
    },
    {
      paragraph: {
        text:
          "Ruben Loftus Cheek was already in the England squad of the 2018 World Cup with limited appearances. He’s already 24 but this Chelsea “youngster” has shown promise whenever he’s played. He lost most of this season due to that frustrating injury before the Europa league final in 2019 but he’s back to full fitness now. The first thing you notice about him is that he’s tall and looks incredibly strong. That brings 2 things, he is able to hold the play really well and he has an advantage in aerial duels. He is more of a box-to-box midfielder but doesn’t shy away from coming deep to contribute in possession. He has this exceptional ability to recognize space and for his height, his dribbling is pretty good. Loftus Cheek can give England a physical edge in midfield not only during defensive transitions but also during attacks if he’s placed slightly forward as a target for long balls. Something to think about in my opinion."
      },
    },

    {
      image: {
        src:
          "https://i.dailymail.co.uk/1/2018/10/05/15/4795482-0-image-m-114_1538749046942.jpg",
        caption:
          "Ruben Loftus Cheek. Even though he was injured for the majority of this season, his talent is undeniable.",
      },
    },
    {
      paragraph: {
        text:
          "Another option is someone who has truly resurrected his career after a well thought transfer, Alex Oxlade Chamberlain. It is rumoured that he made Klopp promise that he would be predominantly deployed as a midfielder. That demand was a genuine surprise to me because I had always pictured him as a winger. Chamberlain’s last season pre-injury and this season’s performances were high quality that challenged the already established midfield 3 of Liverpool. His main qualities as a player is that he is quick, he can dribble and he has an eye for long range goals with his bullet right foot. Ox is one of those players who looks like he’s gliding through the pitch and just waiting for the right moment to unleash a shot. This unpredictability would definitely benefit England against teams that give a lot of space in front of the box. However, we’re talking about balancing here and Ox isn’t someone who is great at other things. I mean yes he’s hardworking but his defensive attributes and passing is not really something he is hauled for. He could be a great option for a 60th minute sub but as a starter? The balancing act would fail."
      },
    },
    {
      image: {
        src:
          "https://img.bleacherreport.net/img/images/photos/003/819/663/hi-res-d22716d94622feb23d53f0373129df0f_crop_north.jpg?h=533&w=800&q=70&crop_x=center&crop_y=top",
        caption:
          "Alex Oxlade Chamberlain has been a fine performer for Liverpool both pre and post his injury.",
      },
    },
    {
      image: {
        src:
          "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F8dac81c4-566a-11ea-8d8f-51ad578bbcfe.jpg?crop=2248%2C1265%2C1139%2C91&resize=1180",
        caption: "James Ward – Prowse, a decent option? ",
      },
    },
    {
      paragraph: {
        text:
          "If Southgate thinks these options are more inclined to their attacking side of play than their defensive one, he has one player in his locker who if he’s brave enough to start, can clearly give him a perfect fit. James Ward – Prowse has transformed himself from a dude who takes freekicks to a dude that does absolutely everything. As a midfielder in a press inclined Hasenhüttl side, James played in central midfield but also on the right side of midfield. Offensively, his passing is neat and his long balls are pinpoint. Defensively his tackling and interceptions are brilliant making him a fan favorite at the St Mary’s. Oh and of course, his setpieces are top notch and that is always an icing on the cake for England fans who have seen Harry Kane take corners (no clue why you would make your principal aerial threat take corners)."
      },
    },
    {
      image: {
        src:
          "https://images.ladbible.com/thumbnail?type=jpeg&url=http://20.theladbiblegroup.com/s3/content/ac7848a659fd03fca99e26a3e5b6a5d9.png&quality=70&width=720",
        caption:
          "Harry Kane taking a corner. Something England won’t have to see again if Ward – Prowse is included in the squad.",
      },
    },
    {
      paragraph: {
        text:
          "The balancing act is a difficult one, if Southgate is thinking about the obvious then he’s sure to go for Henderson. Ruben Loftus Cheek seems like the perfect fit post-Henderson. Ox sadly doesn’t really fit in this puzzle and even though Ward Prowse would be the closest shout to a perfect central midfielder, it would be quite surprising to see Southgate making such a brave decision considering the players he has before him."
      },
    },
    {
      subheading: "The Hybrid Theory",
    },
    {
      paragraph: {
        text:
          "Ahh the number 10s, what a special breed they were. It was almost like the coaches built their teams just so they could create the perfect stage for the 10s to enter the scene and do their magic. Maradona, Baggio, Deco, Rui Costa, Riquelme, Messi, Ozil, James, we’ve just seen so many of them."
      },
    },
    {
      image: {
        src: "https://img.fifa.com/image/upload/t_s2/bhh3sbmraoxqaqhkpklu.jpg",
        caption:
          "Juan Roman Riquelme, dubbed as the last traditional number 10.",
      },
    },
    {
      paragraph: {
        text:
          "England could do with a few number 10s, mainly because their overall chance creation in games hasn’t been that exceptional. Relying heavily on direct balls or ball progression from wingers or wing backs, England haven’t really been the side that dominates centrally, which then leads to lesser chance creations as long balls or crosses from wide aren’t really the most effective way to create them. The sad thing about this position is that just when England needed a 10, football seems to have forgotten about this special position. Coaches simply can’t afford to give any player a free-pass."
      },
    },
    {
      paragraph: {
        text:
          "Football has become so press oriented that no one will give midfielders the time and space to do what number 10s did. However that doesn’t mean the magic that position had doesn’t exist, it has just evolved into something different. The number 8s in football have made sure there are some remnants of that legendary position."
      },
    },
    {
      paragraph: {
        text:
          "The 8/10 hybrid is essentially a player that can both work as an 8 meaning start in the central position, recognize then run into space, progress the ball forward and pass very well but also can work in between the lines as a number 10, dragging defenders, providing for strikers and scoring themselves. I really can’t find exactly where this morphing began but the closest origin story I can give is the development of the “Raumdeuter” role coined by Thomas Muller."
      },
    },
    {
      image: {
        src:
          "https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/03/06/19/Thomas-Muller.jpg",
        caption: 'Thomas Muller. The main who coined the term “Raumdeuter".',
      },
    },
    {
      paragraph: {
        text:
          "In England, Dele Alli was the closest thing to a Raumdeuter. Someone who could position himself centrally during buildup but also move forward in between the lines often as a supporting striker as the attack progressed. Alli played in the 2018 World Cup, both as a central midfielder alongside Henderson or in the hole behind Sterling and Kane (in the area operated by the number 10). The main advantage of being a number 10 is that your positional rigidity is removed and you’re free to roam around to linkup play or create overloads, something Alli loves doing. You could find him wide linking up play with the wingbacks, behind Kane or sometimes the most forward when Kane dropped deep. He had this unique ability to be in the right place at the right time, his goal against Sweden where he was perfectly positioned to score that header a very good example of this ability. This capacity to perceive space is the reason he’s a Raumdeuter which literally means “space interpreter”."
      },
    },
    {
      image: {
        src:
          "https://resources.premierleague.com/premierleague/photo/2019/11/06/38787e91-7ee0-476f-9d64-f1ceb4b65005/dele-alli.jpg",
        caption: "Dele Alli, the first English “Raumdeuter”.",
      },
    },
    {
      paragraph: {
        text:
          "As good as Alli sounds, his inconsistency under both Pochhetino and right now under Jose is a concern for Southgate. Alli was incredible in his first 2 seasons for Spurs but was criticized a lot for his inconsistency in his 3rd season. The appointment of Jose brought some promise but overall he hasn’t really been trustworthy in the past 2 years. However, England have somehow managed to produce not just one but 3 players who are a similar mould as Alli."
      },
    },
    {
      paragraph: {
        text:
          "James Maddison was bought by Leicester from Norwich 2 seasons ago without much noise. His football made the noise for him as he quickly became a regular starter with a string of remarkable performances back to back. He started as a pure number 10 under Claude Puel but after Brendan Rodgers took charge, he was fielded as an attacking midfielder in a 4-3-3 and sometimes even as a left winger. It was here that he produced his best. Again, he was spectacular at 2 things which I’ve described the 8/10 hybrid must do really well, progression and creation. In terms of progression, Maddison completed 62% of his dribbles this season which gives him the ability to unlock deep blocks. In terms of creation, Maddison racked up a number of assists operating behind Vardy as the attack progressed and making 2.7 key passes per game. Maddison is the definition of a modern attacking midfielder who blurs the lines between the number 8 and a number 10."
      },
    },
    {
      image: {
        src:
          "https://resources.premierleague.com/premierleague/photo/2019/09/11/296be408-5c4f-4fb7-855b-88d8b1f897bb/James-Maddison.jpg",
        caption: "James Maddison, the Leicester City playmaker.",
      },
    },
    {
      paragraph: {
        text:
          "If you thought Maddison was mouth watering, his close friend and Aston Villa captain Jack Grealish is even better. In his first season in the PL, Grealish carried his Villa side and did everything a midfielder must do. He even tracked back and defended without questions. Grealish is someone who gives his 100% to every game he plays. Harry Kane has been the captain for a while now but they’ve desperately lacked a rough leader in their pack, someone in the mould of John Terry or Rio Ferdinand. Grealish could be one of that type, he’s vocal and he demands the best of his teammates. Position wise, he’s similar to Maddison in that he can start from a central position, dribbles his way to spaces in between the lines and creates. The chief difference is that Maddison likes operate centrally but Grealish is just all over the place, just like Alli. The reason might be that Villa are so heavily reliant on his actions in midfield (similar to what we have seen with Bruno Fernandes at Manchester United) and this would obviously need to change in the national team because he will have better players around him. Southgate got a lot of stick for not calling Grealish up for the Euro qualifiers the last time but I don’t think he can avoid Grealish anymore, he’s simply too good to not be selected. Grealish has operated in a sort of 4-3-3 with Villa as the attacking midfielder and also as a left winger which means operating in a potential Southgate 4-3-3 won’t be an issue for him."
      },
    },
    {
      paragraph: {
        text:
          "The doubts over a starting formation does present more options for Southgate though. Even though he shows a preference for the 4-3-3, he has tried a version of the 4-2-3-1 which requires a more “purer” number 10. Not that Grealish and Maddison cannot play that role but Mason Mount presents himself as a better fit in this case. Although he’s been already tried out vs the Czechs in a quite disappointing 2-1 loss at the Euro qualifiers, it would be quite harsh to dismiss him entirely."
      },
    },
    {
      paragraph: {
        text:
          "Mason Mount has been quite a regular starter for Chelsea this season after impressing in his loan spell at Derby with Frank Lampard. Lampard played various formations this season with Chelsea but the one where Mount impressed the most is the 4-2-1-3 (a small tweak to the original 4-2-3-1) where he played behind the Chelsea attacking trio of Abraham, Willian and Pulisic/Pedro. With Kovacic already the ball progressor behind him tasked with most of the dribbling duties, Mount operated more on the final third of play. The final third is a very crowded area of the pitch so to excel here, you need excellent movement and quick passing. He is flexible and can function very well in a limited amount of space. He does have a preference for dribbling more than creating and his passing could improve more, something that can push him down the pecking order considering how good Maddison and Grealish are in those aspects. However that is always a skill you can improve especially considering how young Mount is. Maddison and Grealish both being fielded in wide positions in their respective clubs also helps the youngster in some ways. The next season is absolutely crucial for him to give a fair shout as a starter for England."
      },
    },
    {
      image: {
        src:
          "https://resources.premierleague.com/photos/2019/08/19/421f5a5e-bc0a-4ab0-9074-2c1ffd8b25dd/mount3.jpg?width=862&height=620",
        caption: "Mason Mount, the more “proper” number 10 from Chelsea",
      },
    },
    {
      paragraph: {
        text:
          "I’ve presented a more braver option in the central midfield role and I have someone here too whose season has been underrated and will probably never be a starter for the national side but someone that should at least be considered, Dwight McNeil. First thing, he didn’t even start as a central midfielder for Burnley. He’s was mostly fielded as a left winger or a left sided midfielder but what he did playing there was similar to what attacking midfielders do. First let’s just look at the big picture, he’s a 20 year old playing in the only premier league side that has adopted the long ball approach as their main style of play. Playing wide predominantly, he has sensational dribbling, passing and crossing statistics for a team like Burnley. He is literally the only proper creative source at Burnley, all this in the raw age of 20. The things I love about him are his body movements and low crosses through the box, an asset that has helped him rack up 5 assists this season, not something a Burnley player is known for."
      },
    },
    {
      image: {
        src:
          "https://img.bleacherreport.net/img/images/photos/003/857/454/hi-res-5fc6fbbdb6a261c246f8efb64149f0f8_crop_north.jpg?1584174782&w=3072&h=2048",
        caption: "Pic – Dwight McNeil, the 20 year old midfielder from Burnley",
      },
    },
    {
      subheading: "Conclusion",
    },
    {
      paragraph: {
        text:
          "The whole point of this article is first, to show that it is high time to move past the Eric Diers, the Jesse Lingards and the Ross Barkleys. It is the right time for England to transition into a newer generation of much more talented midfielders who will give them a different variation of attacking and also provide the creative edge required by England in the final third. Their defence is somewhat sorted, their attack is somewhat sorted but their midfield needs rejuvenation."
      },
    },
    {
      paragraph: {
        text:
          "The second point is to make sure that England don’t repeat the same mistakes they’ve committed previously – picking players that don’t gel properly.",
      },
    },
    {
      paragraph: {
        text:
          "Balance is the key to avoid that mistake and that is why a set formation needs to be in place so that the right players can be picked. If Southgate is sticking to a 4-3-3, Winks in the holding position seems to be the finest option. Henderson or Loftus Cheek alongside him will give England the balance in transitions while Maddison or Grealish will make sure the number 10 position lives on as the 8/10 hybrid."
      },
    },
    {
      paragraph: {
        text:
          "If Southgate is to incline towards a 4-2-3-1, Declan Rice is a fair shout too. If he is teed up with a more creative player, he can sit back and fulfill the duties of a proper defensive midfielder. If more security is needed behind, he can be teed up with Winks. Otherwise, a Rice – Henderson and later a Rice – Loftus Cheek double pivot wouldn’t be that bad. Maddison or Grealish can operate as the 10 but Mason Mount most certainly rises up the list if 4-2-3-1 comes into the picture but again that depends on how he does next season."
      },
    },
    {
      paragraph: {
        text:
          "Another season also presents a chance for even younger players, the likes of Phil Foden, Joe Willock, Todd Cantwell, Angel Gomes to up their game so that Southgate has an even bigger headache. However this is a scenario for the future. One thing that’s certain right now is that England have produced some genuine talents in midfield and the path forward for the national team is certainly exciting."
      },
    },
    {
      image: {
        src:
          "https://www.cityam.com/wp-content/uploads/2020/03/1197011649-960x645.jpg",
        caption: "Phil Foden, a player for the future.",
      },
    },
  ],
};

app.get("/articles", (req, res) => {
  res.json(Skeleton);
});
