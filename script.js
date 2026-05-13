// Load saved likes from the browser's Local Storage
let savedLikes = JSON.parse(localStorage.getItem('quietude_likes')) || [];

// MASSIVE COMPRESSED OFFLINE DATABASE (500 Quotes)
// Format: [ "Quote Text", "Author", "Category" ]
const rawData = [
    // --- Batch 1 & 2 (250 Quotes) ---
    ["The universe is under no obligation to make sense to you.", "Neil deGrasse Tyson", "Wisdom"],
    ["Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.", "Marie Curie", "Motivation"],
    ["I have no special talent. I am only passionately curious.", "Albert Einstein", "Mindfulness"],
    ["Science is not only a disciple of reason but, also, one of romance and passion.", "Stephen Hawking", "Motivation"],
    ["Talk is cheap. Show me the code.", "Linus Torvalds", "Creativity"],
    ["First, solve the problem. Then, write the code.", "John Johnson", "Wisdom"],
    ["Creativity is intelligence having fun.", "Albert Einstein", "Creativity"],
    ["The unexamined life is not worth living.", "Socrates", "Wisdom"],
    ["Knowing yourself is the beginning of all wisdom.", "Aristotle", "Wisdom"],
    ["He who knows others is wise; he who knows himself is enlightened.", "Lao Tzu", "Wisdom"],
    ["We suffer more often in imagination than in reality.", "Seneca", "Wisdom"],
    ["The only true wisdom is in knowing you know nothing.", "Socrates", "Wisdom"],
    ["Patience is bitter, but its fruit is sweet.", "Aristotle", "Wisdom"],
    ["To live is the rarest thing in the world. Most people exist, that is all.", "Oscar Wilde", "Life"],
    ["Nature does not hurry, yet everything is accomplished.", "Lao Tzu", "Mindfulness"],
    ["Where there is love there is life.", "Mahatma Gandhi", "Love"],
    ["It always seems impossible until it's done.", "Nelson Mandela", "Motivation"],
    ["The journey of a thousand miles begins with one step.", "Lao Tzu", "Motivation"],
    ["That which does not kill us makes us stronger.", "Friedrich Nietzsche", "Motivation"],
    ["Life is what happens when you're busy making other plans.", "John Lennon", "Life"],
    ["When the power of love overcomes the love of power the world will know peace.", "Jimi Hendrix", "Love"],
    ["The mind is everything. What you think you become.", "Buddha", "Mindfulness"],
    ["The best time to plant a tree was 20 years ago. The second best time is now.", "Chinese Proverb", "Motivation"],
    ["Eighty percent of success is showing up.", "Woody Allen", "Motivation"],
    ["Your time is limited, so don't waste it living someone else's life.", "Steve Jobs", "Life"],
    ["Winning isn't everything, but wanting to win is.", "Vince Lombardi", "Motivation"],
    ["I am not a product of my circumstances. I am a product of my decisions.", "Stephen Covey", "Wisdom"],
    ["You can never cross the ocean until you have the courage to lose sight of the shore.", "Christopher Columbus", "Motivation"],
    ["I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.", "Maya Angelou", "Life"],
    ["Either you run the day, or the day runs you.", "Jim Rohn", "Motivation"],
    ["Whether you think you can or you think you can't, you're right.", "Henry Ford", "Wisdom"],
    ["The two most important days in your life are the day you are born and the day you find out why.", "Mark Twain", "Life"],
    ["Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it.", "Johann Wolfgang von Goethe", "Creativity"],
    ["The best revenge is massive success.", "Frank Sinatra", "Motivation"],
    ["People often say that motivation doesn't last. Well, neither does bathing. That's why we recommend it daily.", "Zig Ziglar", "Motivation"],
    ["Life shrinks or expands in proportion to one's courage.", "Anais Nin", "Life"],
    ["If you hear a voice within you say 'you cannot paint,' then by all means paint and that voice will be silenced.", "Vincent Van Gogh", "Creativity"],
    ["There is only one way to avoid criticism: do nothing, say nothing, and be nothing.", "Aristotle", "Wisdom"],
    ["The only person you are destined to become is the person you decide to be.", "Ralph Waldo Emerson", "Life"],
    ["Go confidently in the direction of your dreams. Live the life you have imagined.", "Henry David Thoreau", "Life"],
    ["Few things can help an individual more than to place responsibility on him, and to let him know that you trust him.", "Booker T. Washington", "Wisdom"],
    ["Certain things catch your eye, but pursue only those that capture the heart.", "Ancient Indian Proverb", "Love"],
    ["Believe you can and you're halfway there.", "Theodore Roosevelt", "Motivation"],
    ["Everything you've ever wanted is on the other side of fear.", "George Addair", "Motivation"],
    ["We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.", "Plato", "Wisdom"],
    ["Start where you are. Use what you have. Do what you can.", "Arthur Ashe", "Motivation"],
    ["Fall seven times and stand up eight.", "Japanese Proverb", "Motivation"],
    ["When one door of happiness closes, another opens, but often we look so long at the closed door that we do not see the one that has been opened for us.", "Helen Keller", "Life"],
    ["Everything has beauty, but not everyone can see.", "Confucius", "Mindfulness"],
    ["How wonderful it is that nobody need wait a single moment before starting to improve the world.", "Anne Frank", "Motivation"],
    ["When you let go of who you are, you become what you might be.", "Lao Tzu", "Mindfulness"],
    ["Life is not measured by the number of breaths we take, but by the moments that take our breath away.", "Maya Angelou", "Life"],
    ["Happiness is not something readymade. It comes from your own actions.", "Dalai Lama", "Mindfulness"],
    ["If you're offered a seat on a rocket ship, don't ask what seat! Just get on.", "Sheryl Sandberg", "Motivation"],
    ["If the wind will not serve, take to the oars.", "Latin Proverb", "Motivation"],
    ["You can't fall if you don't climb. But there's no joy in living your whole life on the ground.", "Unknown", "Life"],
    ["We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained.", "Marie Curie", "Motivation"],
    ["Too many of us are not living our dreams because we are living our fears.", "Les Brown", "Life"],
    ["Challenges are what make life interesting and overcoming them is what makes life meaningful.", "Joshua J. Marine", "Life"],
    ["If you want to lift yourself up, lift up someone else.", "Booker T. Washington", "Wisdom"],
    ["You take your life in your own hands, and what happens? A terrible thing, no one to blame.", "Erica Jong", "Wisdom"],
    ["I didn't fail the test. I just found 100 ways to do it wrong.", "Benjamin Franklin", "Creativity"],
    ["In order to succeed, your desire for success should be greater than your fear of failure.", "Bill Cosby", "Motivation"],
    ["A person who never made a mistake never tried anything new.", "Albert Einstein", "Creativity"],
    ["The person who says it cannot be done should not interrupt the person who is doing it.", "Chinese Proverb", "Wisdom"],
    ["There are no traffic jams along the extra mile.", "Roger Staubach", "Motivation"],
    ["It is never too late to be what you might have been.", "George Eliot", "Motivation"],
    ["You become what you believe.", "Oprah Winfrey", "Mindfulness"],
    ["I would rather die of passion than of boredom.", "Vincent van Gogh", "Life"],
    ["A truly rich man is one whose children run into his arms when his hands are empty.", "Unknown", "Love"],
    ["It is not what you do for your children, but what you have taught them to do for themselves, that will make them successful human beings.", "Ann Landers", "Wisdom"],
    ["If you want your children to turn out well, spend twice as much time with them, and half as much money.", "Abigail Van Buren", "Love"],
    ["Build your own dreams, or someone else will hire you to build theirs.", "Farrah Gray", "Motivation"],
    ["The battles that count aren't the ones for gold medals. The struggles within yourself—the invisible battles inside all of us—that's where it's at.", "Jesse Owens", "Motivation"],
    ["Education costs money. But then so does ignorance.", "Sir Claus Moser", "Wisdom"],
    ["I have learned over the years that when one's mind is made up, this diminishes fear.", "Rosa Parks", "Mindfulness"],
    ["It does not matter how slowly you go as long as you do not stop.", "Confucius", "Motivation"],
    ["If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.", "Oprah Winfrey", "Mindfulness"],
    ["Remember that not getting what you want is sometimes a wonderful stroke of luck.", "Dalai Lama", "Life"],
    ["You can't use up creativity. The more you use, the more you have.", "Maya Angelou", "Creativity"],
    ["Dream big and dare to fail.", "Norman Vaughan", "Motivation"],
    ["Our lives begin to end the day we become silent about things that matter.", "Martin Luther King Jr.", "Wisdom"],
    ["Do what you can, where you are, with what you have.", "Teddy Roosevelt", "Motivation"],
    ["If you do what you've always done, you'll get what you've always gotten.", "Tony Robbins", "Wisdom"],
    ["Dreaming, after all, is a form of planning.", "Gloria Steinem", "Creativity"],
    ["It's your place in the world; it's your life. Go on and do all you can with it, and make it the life you want to live.", "Mae Jemison", "Life"],
    ["You may be disappointed if you fail, but you are doomed if you don't try.", "Beverly Sills", "Motivation"],
    ["Remember no one can make you feel inferior without your consent.", "Eleanor Roosevelt", "Wisdom"],
    ["Life is what we make it, always has been, always will be.", "Grandma Moses", "Life"],
    ["The question isn't who is going to let me; it's who is going to stop me.", "Ayn Rand", "Motivation"],
    ["When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.", "Henry Ford", "Motivation"],
    ["It's not the years in your life that count. It's the life in your years.", "Abraham Lincoln", "Life"],
    ["Change your thoughts and you change your world.", "Norman Vincent Peale", "Mindfulness"],
    ["Either write something worth reading or do something worth writing.", "Benjamin Franklin", "Creativity"],
    ["Nothing is impossible, the word itself says, “I'm possible!”", "Audrey Hepburn", "Motivation"],
    ["The only way to do great work is to love what you do.", "Steve Jobs", "Love"],
    ["If you can dream it, you can achieve it.", "Zig Ziglar", "Motivation"],
    ["Don't judge each day by the harvest you reap but by the seeds that you plant.", "Robert Louis Stevenson", "Wisdom"],
    ["Write it on your heart that every day is the best day in the year.", "Ralph Waldo Emerson", "Mindfulness"],
    ["Every moment is a fresh beginning.", "T.S. Eliot", "Mindfulness"],
    ["Without His love I can do nothing, with His love there is nothing I cannot do.", "Unknown", "Love"],
    ["Everything you can imagine is real.", "Pablo Picasso", "Creativity"],
    ["Simplicity is the ultimate sophistication.", "Leonardo da Vinci", "Creativity"],
    ["Whatever you do, do it well.", "Walt Disney", "Motivation"],
    ["What we think, we become.", "Buddha", "Mindfulness"],
    ["All limitations are self-imposed.", "Oliver Wendell Holmes", "Wisdom"],
    ["Tough times never last but tough people do.", "Robert H. Schuller", "Motivation"],
    ["Problems are not stop signs, they are guidelines.", "Robert H. Schuller", "Wisdom"],
    ["One day the people that don't even believe in you will tell everyone how they met you.", "Johnny Depp", "Motivation"],
    ["If I'm gonna tell a real story, I'm gonna start with my name.", "Kendrick Lamar", "Creativity"],
    ["If you tell the truth, you don't have to remember anything.", "Mark Twain", "Wisdom"],
    ["Have enough courage to trust love one more time and always one more time.", "Maya Angelou", "Love"],
    ["For every minute you are angry you lose sixty seconds of happiness.", "Ralph Waldo Emerson", "Mindfulness"],
    ["I think, therefore I am.", "René Descartes", "Wisdom"],
    ["A room without books is like a body without a soul.", "Cicero", "Wisdom"],
    ["You only live once, but if you do it right, once is enough.", "Mae West", "Life"],
    ["Be the change that you wish to see in the world.", "Mahatma Gandhi", "Wisdom"],
    ["In three words I can sum up everything I've learned about life: it goes on.", "Robert Frost", "Life"],
    ["If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.", "J.K. Rowling", "Wisdom"],
    ["No one can make you feel inferior without your consent.", "Eleanor Roosevelt", "Wisdom"],
    ["If you don't stand for something you will fall for anything.", "Gordon A. Eadie", "Wisdom"],
    ["I have not failed. I've just found 10,000 ways that won't work.", "Thomas A. Edison", "Motivation"],
    ["It is never too late to be what you might have been.", "George Eliot", "Motivation"],
    ["A friend is someone who knows all about you and still loves you.", "Elbert Hubbard", "Love"],
    ["To live is the rarest thing in the world. Most people exist, that is all.", "Oscar Wilde", "Life"],
    ["Always forgive your enemies; nothing annoys them so much.", "Oscar Wilde", "Wisdom"],
    ["Live as if you were to die tomorrow. Learn as if you were to live forever.", "Mahatma Gandhi", "Wisdom"],
    ["We accept the love we think we deserve.", "Stephen Chbosky", "Love"],
    ["Without music, life would be a mistake.", "Friedrich Nietzsche", "Creativity"],
    ["To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", "Ralph Waldo Emerson", "Life"],
    ["Insanity is doing the same thing, over and over again, but expecting different results.", "Narcotics Anonymous", "Wisdom"],
    ["What you do makes a difference, and you have to decide what kind of difference you want to make.", "Jane Goodall", "Wisdom"],
    ["It is better to be hated for what you are than to be loved for what you are not.", "Andre Gide", "Life"],
    ["The fool doth think he is wise, but the wise man knows himself to be a fool.", "William Shakespeare", "Wisdom"],
    ["Whenever you find yourself on the side of the majority, it is time to pause and reflect.", "Mark Twain", "Wisdom"],
    ["Life is what happens to us while we are making other plans.", "Allen Saunders", "Life"],
    ["A woman is like a tea bag - you can't tell how strong she is until you put her in hot water.", "Eleanor Roosevelt", "Wisdom"],
    ["It is not a lack of love, but a lack of friendship that makes unhappy marriages.", "Friedrich Nietzsche", "Love"],
    ["Good friends, good books, and a sleepy conscience: this is the ideal life.", "Mark Twain", "Life"],
    ["Life is like riding a bicycle. To keep your balance, you must keep moving.", "Albert Einstein", "Life"],
    ["There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.", "Albert Einstein", "Mindfulness"],
    ["If you judge people, you have no time to love them.", "Mother Teresa", "Love"],
    ["Peace begins with a smile.", "Mother Teresa", "Mindfulness"],
    ["The purpose of our lives is to be happy.", "Dalai Lama", "Life"],
    ["Let us sacrifice our today so that our children can have a better tomorrow.", "A. P. J. Abdul Kalam", "Motivation"],
    ["Don't take rest after your first victory because if you fail in second, more lips are waiting to say that your first victory was just luck.", "A. P. J. Abdul Kalam", "Motivation"],
    ["You cannot change your future, but you can change your habits, and surely your habits will change your future.", "A. P. J. Abdul Kalam", "Wisdom"],
    ["Creativity is seeing the same thing but thinking differently.", "A. P. J. Abdul Kalam", "Creativity"],
    ["Learning gives creativity, creativity leads to thinking, thinking provides knowledge, knowledge makes you great.", "A. P. J. Abdul Kalam", "Wisdom"],
    ["If you fail, never give up because F.A.I.L. means 'First Attempt In Learning'.", "A. P. J. Abdul Kalam", "Motivation"],
    ["The only impossible journey is the one you never begin.", "Tony Robbins", "Motivation"],
    ["Do not go where the path may lead, go instead where there is no path and leave a trail.", "Ralph Waldo Emerson", "Wisdom"],
    ["Out of difficulties grow miracles.", "Jean de La Bruyere", "Motivation"],
    ["In the middle of every difficulty lies opportunity.", "Albert Einstein", "Wisdom"],
    ["Opportunity does not knock, it presents itself when you beat down the door.", "Kyle Chandler", "Motivation"],
    ["Success is not final, failure is not fatal: it is the courage to continue that counts.", "Winston Churchill", "Motivation"],
    ["You miss 100% of the shots you don't take.", "Wayne Gretzky", "Motivation"],
    ["The best way to predict your future is to create it.", "Abraham Lincoln", "Creativity"],
    ["Happiness is not by chance, but by choice.", "Jim Rohn", "Mindfulness"],
    ["Act as if what you do makes a difference. It does.", "William James", "Motivation"],
    ["Keep your face always toward the sunshine—and shadows will fall behind you.", "Walt Whitman", "Mindfulness"],
    ["Limit your 'always' and your 'nevers'.", "Amy Poehler", "Wisdom"],
    ["Stay close to anything that makes you glad you are alive.", "Hafez", "Life"],
    ["Make each day your masterpiece.", "John Wooden", "Motivation"],
    ["Someday is not a day of the week.", "Janet Dailey", "Motivation"],
    ["Every strike brings me closer to the next home run.", "Babe Ruth", "Motivation"],
    ["Don't wait. The time will never be just right.", "Napoleon Hill", "Motivation"],
    ["Everything has beauty, but not everyone sees it.", "Confucius", "Mindfulness"],
    ["You are enough just as you are.", "Meghan Markle", "Mindfulness"],
    ["Try to be a rainbow in someone's cloud.", "Maya Angelou", "Love"],
    ["Find out who you are and do it on purpose.", "Dolly Parton", "Life"],
    ["If you want the rainbow, you gotta put up with the rain.", "Dolly Parton", "Wisdom"],
    ["Light tomorrow with today.", "Elizabeth Barrett Browning", "Motivation"],
    ["There is no saint without a past, no sinner without a future.", "Augustine of Hippo", "Wisdom"],
    ["Love the life you live. Live the life you love.", "Bob Marley", "Life"],
    ["What comes easy won't last. What lasts won't come easy.", "Unknown", "Wisdom"],
    ["It always seems impossible until it is done.", "Nelson Mandela", "Motivation"],
    ["If opportunity doesn't knock, build a door.", "Milton Berle", "Creativity"],
    ["Action is the foundational key to all success.", "Pablo Picasso", "Motivation"],
    ["Quality is not an act, it is a habit.", "Aristotle", "Wisdom"],
    ["You are never too old to set another goal or to dream a new dream.", "C.S. Lewis", "Motivation"],
    ["Do one thing every day that scares you.", "Eleanor Roosevelt", "Motivation"],
    ["Failure is the condiment that gives success its flavor.", "Truman Capote", "Wisdom"],
    ["Your imagination is your preview of life's coming attractions.", "Albert Einstein", "Creativity"],
    ["Turn your wounds into wisdom.", "Oprah Winfrey", "Wisdom"],
    ["Love is a serious mental disease.", "Plato", "Love"],
    ["Let all that you do be done in love.", "1 Corinthians 16:14", "Love"],
    ["True love stories never have endings.", "Richard Bach", "Love"],
    ["The water shines only by the sun. And it is you who are my sun.", "Charles de Leusse", "Love"],
    ["To love and be loved is to feel the sun from both sides.", "David Viscott", "Love"],
    ["Love is when the other person's happiness is more important than your own.", "H. Jackson Brown Jr.", "Love"],
    ["Love cures people—both the ones who give it and the ones who receive it.", "Karl Menninger", "Love"],
    ["The supreme happiness of life is the conviction that we are loved.", "Victor Hugo", "Love"],
    ["Love is a friendship set to music.", "Joseph Campbell", "Love"],
    ["Where there is love, there is peace.", "Unknown", "Love"],
    ["Mindfulness is a way of befriending ourselves and our experience.", "Jon Kabat-Zinn", "Mindfulness"],
    ["Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.", "Thich Nhat Hanh", "Mindfulness"],
    ["Smile, breathe and go slowly.", "Thich Nhat Hanh", "Mindfulness"],
    ["Walk as if you are kissing the Earth with your feet.", "Thich Nhat Hanh", "Mindfulness"],
    ["Be happy in the moment, that's enough. Each moment is all we need, not more.", "Mother Teresa", "Mindfulness"],
    ["The little things? The little moments? They aren't little.", "Jon Kabat-Zinn", "Mindfulness"],
    ["Life is a dance. Mindfulness is witnessing that dance.", "Amit Ray", "Mindfulness"],
    ["To understand the immeasurable, the mind must be extraordinarily quiet, still.", "Jiddu Krishnamurti", "Mindfulness"],
    ["Tension is who you think you should be. Relaxation is who you are.", "Chinese Proverb", "Mindfulness"],
    ["Quiet the mind, and the soul will speak.", "Ma Jaya Sati Bhagavati", "Mindfulness"],
    ["Every artist was first an amateur.", "Ralph Waldo Emerson", "Creativity"],
    ["Creativity takes courage.", "Henri Matisse", "Creativity"],
    ["Don't think. Thinking is the enemy of creativity.", "Ray Bradbury", "Creativity"],
    ["The chief enemy of creativity is 'good' sense.", "Pablo Picasso", "Creativity"],
    ["To practice any art, no matter how well or badly, is a way to make your soul grow.", "Kurt Vonnegut", "Creativity"],
    ["Curiosity about life in all of its aspects, I think, is still the secret of great creative people.", "Leo Burnett", "Creativity"],
    ["An essential aspect of creativity is not being afraid to fail.", "Edwin Land", "Creativity"],
    ["Art washes away from the soul the dust of everyday life.", "Pablo Picasso", "Creativity"],
    ["Create with the heart; build with the mind.", "Criss Jami", "Creativity"],
    ["Creativity is allowing yourself to make mistakes. Art is knowing which ones to keep.", "Scott Adams", "Creativity"],
    ["Life is really simple, but we insist on making it complicated.", "Confucius", "Life"],
    ["In three words I can sum up everything I've learned about life: it goes on.", "Robert Frost", "Life"],
    ["The good life is one inspired by love and guided by knowledge.", "Bertrand Russell", "Life"],
    ["Life is an echo. What you send out, comes back.", "Chinese Proverb", "Life"],
    ["The unexamined life is not worth living.", "Socrates", "Life"],
    ["Keep looking up... that's the secret of life.", "Snoopy", "Life"],
    ["My life is my message.", "Mahatma Gandhi", "Life"],
    ["Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", "Buddha", "Life"],
    ["Life is a long lesson in humility.", "James M. Barrie", "Life"],
    ["Accept what is, let go of what was, and have faith in what will be.", "Sonia Ricotti", "Life"],
    ["Be yourself; everyone else is already taken.", "Oscar Wilde", "Wisdom"],
    ["I can resist everything except temptation.", "Oscar Wilde", "Wisdom"],
    ["A room without books is like a body without a soul.", "Cicero", "Wisdom"],
    ["Be the change that you wish to see in the world.", "Mahatma Gandhi", "Wisdom"],
    ["If you tell the truth, you don't have to remember anything.", "Mark Twain", "Wisdom"],
    ["Always forgive your enemies; nothing annoys them so much.", "Oscar Wilde", "Wisdom"],
    ["Without music, life would be a mistake.", "Friedrich Nietzsche", "Wisdom"],
    ["To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", "Ralph Waldo Emerson", "Wisdom"],
    ["Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.", "Bill Keane", "Wisdom"],
    ["It is better to remain silent at the risk of being thought a fool, than to talk and remove all doubt of it.", "Maurice Switzer", "Wisdom"],
    ["A smooth sea never made a skilled sailor.", "Franklin D. Roosevelt", "Motivation"],
    ["Do what you have to do until you can do what you want to do.", "Oprah Winfrey", "Motivation"],
    ["Stop shrinking to fit places you've outgrown.", "Furaha Joy", "Motivation"],
    ["If you get tired, learn to rest, not to quit.", "Banksy", "Motivation"],
    ["Sometimes the bravest thing you can do is just keep going.", "Unknown", "Motivation"],
    ["You didn't come this far to only come this far.", "Unknown", "Motivation"],
    ["Starve your distractions. Feed your focus.", "Unknown", "Motivation"],
    ["The harder you work for something, the greater you'll feel when you achieve it.", "Unknown", "Motivation"],
    ["Doubt kills more dreams than failure ever will.", "Suzy Kassem", "Motivation"],
    ["If it doesn't challenge you, it won't change you.", "Fred DeVito", "Motivation"],
    ["Great things never come from comfort zones.", "Unknown", "Motivation"],
    ["Dream it. Believe it. Build it.", "Unknown", "Motivation"],
    ["Don't stop when you're tired. Stop when you're done.", "David Goggins", "Motivation"],
    ["Wake up with determination. Go to bed with satisfaction.", "Unknown", "Motivation"],
    ["Little by little, a little becomes a lot.", "Tanzanian Proverb", "Motivation"],
    ["Focus on the step in front of you, not the whole staircase.", "Unknown", "Mindfulness"],
    ["Storms make trees take deeper roots.", "Dolly Parton", "Wisdom"],
    ["The sun will rise and we will try again.", "Twenty One Pilots", "Motivation"],
    ["Your potential is endless. Go do what you were created to do.", "Unknown", "Motivation"],
    ["Push yourself, because no one else is going to do it for you.", "Unknown", "Motivation"],
    ["It's going to be hard, but hard does not mean impossible.", "Unknown", "Motivation"],
    ["Don't wait for opportunity. Create it.", "Unknown", "Creativity"],

    // --- Batch 3 (100 Quotes) ---
    ["You have power over your mind—not outside events. Realize this, and you will find strength.", "Marcus Aurelius", "Wisdom"],
    ["The happiness of your life depends upon the quality of your thoughts.", "Marcus Aurelius", "Mindfulness"],
    ["Waste no more time arguing what a good man should be. Be one.", "Marcus Aurelius", "Wisdom"],
    ["The soul becomes dyed with the color of its thoughts.", "Marcus Aurelius", "Mindfulness"],
    ["Very little is needed to make a happy life.", "Marcus Aurelius", "Life"],
    ["Our life is what our thoughts make it.", "Marcus Aurelius", "Mindfulness"],
    ["Confine yourself to the present.", "Marcus Aurelius", "Mindfulness"],
    ["When you arise in the morning, think of what a privilege it is to be alive.", "Marcus Aurelius", "Life"],
    ["Loss is nothing else but change, and change is Nature's delight.", "Marcus Aurelius", "Wisdom"],
    ["If it is not right, do not do it; if it is not true, do not say it.", "Marcus Aurelius", "Wisdom"],
    ["Your living is determined not so much by what life brings to you as by the attitude you bring to life.", "Kahlil Gibran", "Wisdom"],
    ["Trust in dreams, for in them is hidden the gate to eternity.", "Kahlil Gibran", "Creativity"],
    ["Tenderness and kindness are not signs of weakness and despair, but manifestations of strength and resolution.", "Kahlil Gibran", "Love"],
    ["We are all like the bright moon, we still have our darker side.", "Kahlil Gibran", "Life"],
    ["Out of suffering have emerged the strongest souls.", "Kahlil Gibran", "Wisdom"],
    ["Life without love is like a tree without blossoms or fruit.", "Kahlil Gibran", "Love"],
    ["Progress lies not in enhancing what is, but in advancing toward what will be.", "Kahlil Gibran", "Motivation"],
    ["Forget not that the earth delights to feel your bare feet.", "Kahlil Gibran", "Mindfulness"],
    ["Beauty is not in the face; beauty is a light in the heart.", "Kahlil Gibran", "Love"],
    ["The smallest act of kindness is worth more than the grandest intention.", "Kahlil Gibran", "Wisdom"],
    ["Turn your face toward the sun and the shadows fall behind you.", "Maori Proverb", "Mindfulness"],
    ["He who has a why to live can bear almost any how.", "Friedrich Nietzsche", "Wisdom"],
    ["Knowing others is intelligence; knowing yourself is true wisdom.", "Lao Tzu", "Wisdom"],
    ["Do what is right, not what is easy.", "Roy T. Bennett", "Wisdom"],
    ["Small deeds done are better than great deeds planned.", "Peter Marshall", "Motivation"],
    ["The future depends on what you do today.", "Mahatma Gandhi", "Motivation"],
    ["Happiness depends upon ourselves.", "Aristotle", "Mindfulness"],
    ["The secret of getting ahead is getting started.", "Mark Twain", "Motivation"],
    ["Success usually comes to those who are too busy to be looking for it.", "Henry David Thoreau", "Motivation"],
    ["The roots of education are bitter, but the fruit is sweet.", "Aristotle", "Wisdom"],
    ["Do not fear mistakes. You will know failure. Continue to reach out.", "Benjamin Franklin", "Motivation"],
    ["Be faithful in small things because it is in them that your strength lies.", "Mother Teresa", "Wisdom"],
    ["The only limit to our realization of tomorrow is our doubts of today.", "Franklin D. Roosevelt", "Motivation"],
    ["Courage is resistance to fear, mastery of fear—not absence of fear.", "Mark Twain", "Wisdom"],
    ["What lies behind us and what lies before us are tiny matters compared to what lies within us.", "Ralph Waldo Emerson", "Wisdom"],
    ["The way to get started is to quit talking and begin doing.", "Walt Disney", "Motivation"],
    ["If you cannot do great things, do small things in a great way.", "Napoleon Hill", "Motivation"],
    ["Kindness is a language which the deaf can hear and the blind can see.", "Mark Twain", "Love"],
    ["Success is getting what you want. Happiness is wanting what you get.", "Dale Carnegie", "Life"],
    ["A goal without a plan is just a wish.", "Antoine de Saint-Exupéry", "Wisdom"],
    ["Do what you feel in your heart to be right—for you'll be criticized anyway.", "Eleanor Roosevelt", "Wisdom"],
    ["Happiness is not the absence of problems, it's the ability to deal with them.", "Steve Maraboli", "Life"],
    ["The greatest wealth is to live content with little.", "Plato", "Mindfulness"],
    ["Discipline is choosing between what you want now and what you want most.", "Abraham Lincoln", "Wisdom"],
    ["The only journey is the one within.", "Rainer Maria Rilke", "Mindfulness"],
    ["You must do the things you think you cannot do.", "Eleanor Roosevelt", "Motivation"],
    ["To improve is to change; to be perfect is to change often.", "Winston Churchill", "Wisdom"],
    ["Success is stumbling from failure to failure with no loss of enthusiasm.", "Winston Churchill", "Motivation"],
    ["Do not wait to strike till the iron is hot; but make it hot by striking.", "William Butler Yeats", "Motivation"],
    ["Nothing will work unless you do.", "Maya Angelou", "Motivation"],
    ["The greatest glory in living lies not in never falling, but in rising every time we fall.", "Nelson Mandela", "Motivation"],
    ["A calm mind brings inner strength and self-confidence.", "Dalai Lama", "Mindfulness"],
    ["It takes courage to grow up and become who you really are.", "E.E. Cummings", "Life"],
    ["Do not let making a living prevent you from making a life.", "John Wooden", "Life"],
    ["Success is the sum of small efforts repeated day in and day out.", "Robert Collier", "Motivation"],
    ["You cannot find peace by avoiding life.", "Virginia Woolf", "Mindfulness"],
    ["The meaning of life is to give life meaning.", "Viktor Frankl", "Life"],
    ["One who conquers himself is greater than another who conquers a thousand times a thousand men.", "Buddha", "Wisdom"],
    ["Difficulties strengthen the mind, as labor does the body.", "Seneca", "Wisdom"],
    ["What consumes your mind controls your life.", "Unknown", "Mindfulness"],
    ["If you want to shine like a sun, first burn like a sun.", "A. P. J. Abdul Kalam", "Motivation"],
    ["Excellence is a continuous process and not an accident.", "A. P. J. Abdul Kalam", "Wisdom"],
    ["Dream is not that which you see while sleeping, it is something that does not let you sleep.", "A. P. J. Abdul Kalam", "Motivation"],
    ["Great dreams of great dreamers are always transcended.", "A. P. J. Abdul Kalam", "Motivation"],
    ["Thinking should become your capital asset, no matter whatever ups and downs you come across in your life.", "A. P. J. Abdul Kalam", "Wisdom"],
    ["The bird is powered by its own life and by its motivation.", "A. P. J. Abdul Kalam", "Motivation"],
    ["To succeed in your mission, you must have single-minded devotion to your goal.", "A. P. J. Abdul Kalam", "Motivation"],
    ["Man needs difficulties because they are necessary to enjoy success.", "A. P. J. Abdul Kalam", "Wisdom"],
    ["Look at the sky. We are not alone.", "A. P. J. Abdul Kalam", "Life"],
    ["Great teachers emanate out of knowledge, passion and compassion.", "A. P. J. Abdul Kalam", "Wisdom"],
    ["Do not pray for an easy life, pray for the strength to endure a difficult one.", "Bruce Lee", "Motivation"],
    ["Mistakes are always forgivable if one has the courage to admit them.", "Bruce Lee", "Wisdom"],
    ["Absorb what is useful, discard what is useless.", "Bruce Lee", "Wisdom"],
    ["Simplicity is the key to brilliance.", "Bruce Lee", "Creativity"],
    ["The successful warrior is the average man, with laser-like focus.", "Bruce Lee", "Motivation"],
    ["Patience is not passive; on the contrary, it is concentrated strength.", "Bruce Lee", "Wisdom"],
    ["Knowing is not enough, we must apply. Willing is not enough, we must do.", "Johann Wolfgang von Goethe", "Motivation"],
    ["The best preparation for tomorrow is doing your best today.", "H. Jackson Brown Jr.", "Motivation"],
    ["A little progress each day adds up to big results.", "Satya Nani", "Motivation"],
    ["Hardships often prepare ordinary people for an extraordinary destiny.", "C.S. Lewis", "Motivation"],
    ["Never let the fear of striking out keep you from playing the game.", "Babe Ruth", "Motivation"],
    ["A creative man is motivated by the desire to achieve, not by the desire to beat others.", "Ayn Rand", "Creativity"],
    ["If you want to conquer fear, do not sit home and think about it. Go out and get busy.", "Dale Carnegie", "Motivation"],
    ["Your big opportunity may be right where you are now.", "Napoleon Hill", "Motivation"],
    ["To handle yourself, use your head; to handle others, use your heart.", "Eleanor Roosevelt", "Wisdom"],
    ["Success is liking yourself, liking what you do, and liking how you do it.", "Maya Angelou", "Life"],
    ["You don't have to see the whole staircase, just take the first step.", "Martin Luther King Jr.", "Motivation"],
    ["Love all, trust a few, do wrong to none.", "William Shakespeare", "Love"],
    ["A loving heart is the truest wisdom.", "Charles Dickens", "Love"],
    ["No act of kindness, no matter how small, is ever wasted.", "Aesop", "Love"],
    ["The quieter you become, the more you are able to hear.", "Rumi", "Mindfulness"],
    ["Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.", "Rumi", "Wisdom"],
    ["Let yourself be silently drawn by the strange pull of what you really love.", "Rumi", "Love"],
    ["Raise your words, not your voice. It is rain that grows flowers, not thunder.", "Rumi", "Wisdom"],
    ["Why do you stay in prison when the door is so wide open?", "Rumi", "Wisdom"],
    ["Do not feel lonely, the entire universe is inside you.", "Rumi", "Mindfulness"],
    ["Try not to resist life's changes. Let life flow through you.", "Rumi", "Mindfulness"],
    ["When you seek love with all your heart you shall find its echo in the universe.", "Rumi", "Love"],
    ["Be like a tree and let the dead leaves drop.", "Rumi", "Mindfulness"],
    ["Respond to every call that excites your spirit.", "Rumi", "Motivation"],

    // --- Batch 4 (150 Quotes) ---
    ["The future belongs to those who believe in the beauty of their dreams.", "Eleanor Roosevelt", "Motivation"],
    ["He who opens a school door, closes a prison.", "Victor Hugo", "Wisdom"],
    ["Do what you love and the money will follow.", "Marsha Sinetar", "Life"],
    ["Success is how high you bounce when you hit bottom.", "George S. Patton", "Motivation"],
    ["The secret of change is to focus all your energy not on fighting the old, but on building the new.", "Socrates", "Wisdom"],
    ["A journey well begun is half done.", "Aristotle", "Motivation"],
    ["No pressure, no diamonds.", "Thomas Carlyle", "Motivation"],
    ["The mind that opens to a new idea never returns to its original size.", "Albert Einstein", "Creativity"],
    ["He who has patience can have what he will.", "Benjamin Franklin", "Wisdom"],
    ["The greatest mistake you can make in life is to continually fear you will make one.", "Elbert Hubbard", "Wisdom"],
    ["There is no substitute for hard work.", "Thomas A. Edison", "Motivation"],
    ["The more you praise and celebrate your life, the more there is in life to celebrate.", "Oprah Winfrey", "Mindfulness"],
    ["Dreams don't work unless you do.", "John C. Maxwell", "Motivation"],
    ["The best view comes after the hardest climb.", "Unknown", "Motivation"],
    ["What we achieve inwardly will change outer reality.", "Plutarch", "Mindfulness"],
    ["A person is a product of their thoughts.", "Mahatma Gandhi", "Mindfulness"],
    ["Do small things with great love.", "Mother Teresa", "Love"],
    ["Courage starts with showing up and letting ourselves be seen.", "Brené Brown", "Motivation"],
    ["The only thing standing between you and your goal is the story you keep telling yourself.", "Jordan Belfort", "Motivation"],
    ["You were born with wings, why prefer to crawl through life?", "Rumi", "Motivation"],
    ["No one saves us but ourselves. No one can and no one may.", "Buddha", "Wisdom"],
    ["A loving heart is the beginning of all knowledge.", "Thomas Carlyle", "Love"],
    ["The biggest adventure you can take is to live the life of your dreams.", "Oprah Winfrey", "Life"],
    ["Success is not in what you have, but who you are.", "Bo Bennett", "Wisdom"],
    ["Happiness grows at our own firesides.", "Douglas Jerrold", "Life"],
    ["Never regret anything that made you smile.", "Mark Twain", "Life"],
    ["There is sunshine in my soul today.", "Eliza Edmunds Hewitt", "Mindfulness"],
    ["The harder the conflict, the greater the triumph.", "George Washington", "Motivation"],
    ["The best dreams happen when you're awake.", "Cherie Gilderbloom", "Creativity"],
    ["Kind words can be short and easy to speak, but their echoes are truly endless.", "Mother Teresa", "Love"],
    ["Fear defeats more people than any other one thing in the world.", "Ralph Waldo Emerson", "Wisdom"],
    ["He who is not courageous enough to take risks will accomplish nothing in life.", "Muhammad Ali", "Motivation"],
    ["Great acts are made up of small deeds.", "Lao Tzu", "Motivation"],
    ["You are the artist of your own life. Don't hand the paintbrush to anyone else.", "Unknown", "Life"],
    ["Nothing diminishes anxiety faster than action.", "Walter Anderson", "Motivation"],
    ["Success is dependent upon the glands — sweat glands.", "Zig Ziglar", "Motivation"],
    ["To avoid criticism, say nothing, do nothing, be nothing.", "Elbert Hubbard", "Wisdom"],
    ["A happy soul is the best shield for a cruel world.", "Atticus", "Mindfulness"],
    ["The more light you allow within you, the brighter the world you live in will be.", "Shakti Gawain", "Mindfulness"],
    ["Every accomplishment starts with the decision to try.", "John F. Kennedy", "Motivation"],
    ["You are stronger than you seem, braver than you believe, and smarter than you think.", "A. A. Milne", "Motivation"],
    ["We become what we repeatedly do.", "Will Durant", "Wisdom"],
    ["Never let success get to your head and never let failure get to your heart.", "Drake", "Wisdom"],
    ["Your life does not get better by chance, it gets better by change.", "Jim Rohn", "Motivation"],
    ["One today is worth two tomorrows.", "Benjamin Franklin", "Wisdom"],
    ["The world belongs to the energetic.", "Ralph Waldo Emerson", "Motivation"],
    ["If there is no struggle, there is no progress.", "Frederick Douglass", "Motivation"],
    ["Be willing to be a beginner every single morning.", "Meister Eckhart", "Mindfulness"],
    ["A dream you dream alone is only a dream. A dream you dream together is reality.", "Yoko Ono", "Love"],
    ["Keep going. Everything you need will come to you at the perfect time.", "Unknown", "Motivation"],
    ["The meaning of life is to find your gift. The purpose of life is to give it away.", "Pablo Picasso", "Life"],
    ["Life becomes easier when you learn to accept the apology you never got.", "Robert Brault", "Wisdom"],
    ["The strongest people are not those who show strength in front of us but those who win battles we know nothing about.", "Unknown", "Wisdom"],
    ["Wherever life plants you, bloom with grace.", "French Proverb", "Mindfulness"],
    ["You can if you think you can.", "Norman Vincent Peale", "Motivation"],
    ["Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", "Roy T. Bennett", "Motivation"],
    ["A year from now you may wish you had started today.", "Karen Lamb", "Motivation"],
    ["The best way out is always through.", "Robert Frost", "Wisdom"],
    ["What you think you become. What you feel you attract. What you imagine you create.", "Buddha", "Mindfulness"],
    ["Success is the progressive realization of a worthy goal.", "Earl Nightingale", "Motivation"],
    ["Be so good they can't ignore you.", "Steve Martin", "Motivation"],
    ["Silence is sometimes the best answer.", "Dalai Lama", "Wisdom"],
    ["Every wall is a door.", "Ralph Waldo Emerson", "Motivation"],
    ["Nothing can dim the light that shines from within.", "Maya Angelou", "Mindfulness"],
    ["We rise by lifting others.", "Robert Ingersoll", "Love"],
    ["Do not let yesterday take up too much of today.", "Will Rogers", "Wisdom"],
    ["The simple things are also the most extraordinary things.", "Paulo Coelho", "Mindfulness"],
    ["Never be afraid to trust an unknown future to a known God.", "Corrie ten Boom", "Life"],
    ["Hope is being able to see that there is light despite all of the darkness.", "Desmond Tutu", "Motivation"],
    ["You don't always need a plan. Sometimes you just need to breathe, trust, let go and see what happens.", "Mandy Hale", "Mindfulness"],
    ["When you focus on the good, the good gets better.", "Abraham Hicks", "Mindfulness"],
    ["The greatest discovery of all time is that a person can change his future by merely changing his attitude.", "Oprah Winfrey", "Wisdom"],
    ["Character is power.", "Booker T. Washington", "Wisdom"],
    ["Your calm mind is the ultimate weapon against your challenges.", "Bryant McGill", "Mindfulness"],
    ["If you cannot find peace within yourself, you will never find it anywhere else.", "Marvin Gaye", "Mindfulness"],
    ["The key to success is to focus on goals, not obstacles.", "Unknown", "Motivation"],
    ["Don't count the days, make the days count.", "Muhammad Ali", "Motivation"],
    ["Nothing great was ever achieved without enthusiasm.", "Ralph Waldo Emerson", "Motivation"],
    ["Success is a journey, not a destination.", "Arthur Ashe", "Life"],
    ["Every next level of your life will demand a different you.", "Leonardo DiCaprio", "Motivation"],
    ["There is virtue in work and there is virtue in rest.", "Alan Cohen", "Mindfulness"],
    ["Love is composed of a single soul inhabiting two bodies.", "Aristotle", "Love"],
    ["Don't gain the world and lose your soul.", "Bob Marley", "Wisdom"],
    ["A good head and a good heart are always a formidable combination.", "Nelson Mandela", "Wisdom"],
    ["The true sign of intelligence is imagination, not knowledge.", "Albert Einstein", "Creativity"],
    ["He who lives in harmony with himself lives in harmony with the universe.", "Marcus Aurelius", "Mindfulness"],
    ["The soul always knows what to do to heal itself.", "Caroline Myss", "Mindfulness"],
    ["You don't drown by falling in the water; you drown by staying there.", "Edwin Louis Cole", "Motivation"],
    ["There is nothing noble in being superior to your fellow man; true nobility is being superior to your former self.", "Ernest Hemingway", "Wisdom"],
    ["The smallest step in the right direction can end up being the biggest step of your life.", "Unknown", "Motivation"],
    ["You are never alone. You are eternally connected with everyone.", "Amit Ray", "Love"],
    ["Be patient with yourself. Nothing in nature blooms all year.", "Unknown", "Mindfulness"],
    ["Do more things that make you forget to check your phone.", "Unknown", "Mindfulness"],
    ["Nothing is softer or more flexible than water, yet nothing can resist it.", "Lao Tzu", "Wisdom"],
    ["Happiness is letting go of what you think your life is supposed to look like.", "Mandy Hale", "Mindfulness"],
    ["Success means doing the best we can with what we have.", "Zig Ziglar", "Motivation"],
    ["Your direction is more important than your speed.", "Unknown", "Wisdom"],
    ["The soul that sees beauty may sometimes walk alone.", "Johann Wolfgang von Goethe", "Life"],
    ["Never limit yourself because of others’ limited imagination.", "Mae Jemison", "Motivation"],
    ["The greatest healing therapy is friendship and love.", "Hubert H. Humphrey", "Love"],
    ["Life is short, and it is up to you to make it sweet.", "Sarah Louise Delany", "Life"],
    ["Turn your wounds into wisdom.", "Oprah Winfrey", "Wisdom"],
    ["The obstacle is the path.", "Zen Proverb", "Wisdom"],
    ["Discipline is the bridge between goals and accomplishment.", "Jim Rohn", "Motivation"],
    ["Sometimes you win, sometimes you learn.", "John Maxwell", "Wisdom"],
    ["There are years that ask questions and years that answer.", "Zora Neale Hurston", "Life"],
    ["Everything you are looking for is already within you.", "Unknown", "Mindfulness"],
    ["If the plan doesn't work, change the plan, not the goal.", "Unknown", "Motivation"],
    ["Be fearless in the pursuit of what sets your soul on fire.", "Jennifer Lee", "Motivation"],
    ["A kind gesture can reach a wound that only compassion can heal.", "Steve Maraboli", "Love"],
    ["Wisdom begins in wonder.", "Socrates", "Wisdom"],
    ["The strongest actions for a woman is to love herself.", "Unknown", "Love"],
    ["Do not let your fire go out.", "Ayn Rand", "Motivation"],
    ["Energy and persistence conquer all things.", "Benjamin Franklin", "Motivation"],
    ["You cannot swim for new horizons until you have courage to lose sight of the shore.", "William Faulkner", "Motivation"],
    ["The quiet mind is richer than a crown.", "Robert Greene", "Mindfulness"],
    ["What lies at the heart of creativity is surprise.", "Julia Cameron", "Creativity"],
    ["The earth has music for those who listen.", "William Shakespeare", "Mindfulness"],
    ["The future starts today, not tomorrow.", "Pope John Paul II", "Motivation"],
    ["Great opportunities to help others seldom come, but small ones surround us daily.", "Sally Koch", "Love"],
    ["The wise man does at once what the fool does finally.", "Niccolò Machiavelli", "Wisdom"],
    ["Act without expectation.", "Lao Tzu", "Mindfulness"],
    ["Everything you’ve ever wanted is waiting on the other side of consistency.", "Unknown", "Motivation"],
    ["Don't ruin a good today by thinking about a bad yesterday.", "Unknown", "Mindfulness"],
    ["Some people feel the rain. Others just get wet.", "Bob Marley", "Mindfulness"],
    ["Adventure is worthwhile.", "Aesop", "Life"],
    ["If you light a lamp for someone else, it will also brighten your path.", "Buddha", "Love"],
    ["Strength grows in the moments when you think you can't go on but keep going anyway.", "Unknown", "Motivation"],
    ["The only way to discover the limits of the possible is to go beyond them into the impossible.", "Arthur C. Clarke", "Creativity"],
    ["Do not wait for leaders; do it alone, person to person.", "Mother Teresa", "Motivation"],
    ["You must be the master of your own destiny.", "Napoleon Hill", "Motivation"],
    ["A peaceful mind leads to a healthy body.", "Unknown", "Mindfulness"],
    ["If you want to fly, give up everything that weighs you down.", "Buddha", "Mindfulness"],
    ["People grow through experience if they meet life honestly and courageously.", "Eleanor Roosevelt", "Wisdom"],
    ["The happiest people don't have the best of everything; they make the best of everything.", "Unknown", "Life"],
    ["Don't fear failure. Fear being in the exact same place next year as you are today.", "Unknown", "Motivation"],
    ["You are what you do, not what you say you'll do.", "Carl Jung", "Wisdom"],
    ["True happiness comes from the joy of deeds well done.", "Antoine de Saint-Exupéry", "Life"],
    ["Creativity requires the courage to let go of certainties.", "Erich Fromm", "Creativity"],
    ["Be gentle with yourself, you're doing the best you can.", "Unknown", "Mindfulness"],
    ["You can rise up from anything.", "Unknown", "Motivation"],
    ["The only thing we have to fear is fear itself.", "Franklin D. Roosevelt", "Wisdom"],
    ["If you want light to come into your life, you need to stand where it is shining.", "Guy Finley", "Mindfulness"],
    ["Happiness is a direction, not a place.", "Sydney J. Harris", "Life"],
    ["To shine your brightest light is to be who you truly are.", "Roy T. Bennett", "Life"],
    ["There is no innovation and creativity without failure.", "Brené Brown", "Creativity"],
    ["A wise man learns more from his enemies than a fool from his friends.", "Baltasar Gracián", "Wisdom"],
    ["Life is too important to be taken seriously.", "Oscar Wilde", "Life"],
    ["Don't let small minds convince you that your dreams are too big.", "Unknown", "Motivation"],
    ["Your heart knows the way. Run in that direction.", "Rumi", "Love"],
    ["Great things take time.", "Unknown", "Motivation"],
    ["There is no path to happiness; happiness is the path.", "Thich Nhat Hanh", "Mindfulness"],
    ["Live less out of habit and more out of intent.", "Unknown", "Mindfulness"],
    ["The best revenge is to be unlike him who performed the injury.", "Marcus Aurelius", "Wisdom"],
    ["To love oneself is the beginning of a lifelong romance.", "Oscar Wilde", "Love"],
    ["Every sunset brings the promise of a new dawn.", "Ralph Waldo Emerson", "Life"],
    ["Don't be afraid to give up the good to go for the great.", "John D. Rockefeller", "Motivation"],
    ["A grateful heart is a magnet for miracles.", "Unknown", "Mindfulness"],
    ["The greatest wealth is health.", "Virgil", "Life"],
    ["Never stop learning because life never stops teaching.", "Unknown", "Wisdom"],
    ["You carry so much love in your heart. Give some to yourself.", "R.Z.", "Love"],
    ["The deeper that sorrow carves into your being, the more joy you can contain.", "Kahlil Gibran", "Life"],
    ["He who conquers others is strong; he who conquers himself is mighty.", "Lao Tzu", "Wisdom"],
    ["Your vibe attracts your tribe.", "Unknown", "Love"],
    ["Make peace with your broken pieces.", "Unknown", "Mindfulness"],
    ["Every day may not be good, but there is something good in every day.", "Alice Morse Earle", "Mindfulness"],
    ["Success is not about speed, it's about consistency.", "Unknown", "Motivation"],
    ["The quieter you become, the more you can hear.", "Ram Dass", "Mindfulness"],
    ["Never underestimate the power of a kind word.", "Unknown", "Love"],
    ["Shine so brightly that others can find their way too.", "Unknown", "Motivation"]
];

// Unpack the compressed data into usable objects
const library = rawData.map((item, index) => ({
    id: index + 1,
    text: item[0],
    author: item[1],
    category: item[2],
    liked: savedLikes.includes(index + 1)
}));

let currentQuoteId = 1;
let activeFilter = 'All';
let searchQuery = '';

// DOM Elements
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.view-section');
const todayText = document.getElementById('today-text');
const todayAuthor = document.getElementById('today-author');
const todayCategory = document.getElementById('today-category');
const btnNext = document.getElementById('btn-next');
const btnSaveToday = document.getElementById('btn-save-today');
const todayHeartIcon = document.getElementById('today-heart-icon');
const btnCopy = document.getElementById('btn-copy');
const browseGrid = document.getElementById('browse-grid');
const favoritesGrid = document.getElementById('favorites-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');

const heartEmpty = `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>`;
const heartFilled = `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor"/>`;

// Navigation 
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.getAttribute('data-target');
        sections.forEach(sec => sec.classList.remove('active'));
        document.getElementById(target).classList.add('active');
        if(target === 'view-browse') renderBrowse();
        if(target === 'view-favorites') renderFavorites();
    });
});

// Create Individual Quote Card HTML
function createCard(quote) {
    return `
        <div class="quote-card">
            <div class="card-tag">${quote.category}</div>
            <div class="card-text">”${quote.text}”</div>
            <div class="card-footer">
                <div class="card-author">— ${quote.author}</div>
                <button class="heart-btn ${quote.liked ? 'liked' : ''}" onclick="toggleLike(${quote.id})">
                    <svg viewBox="0 0 24 24">${quote.liked ? heartFilled : heartEmpty}</svg>
                </button>
            </div>
        </div>
    `;
}

// Render the Browse Grid with active filters and search
function renderBrowse() {
    let filtered = library;
    if (activeFilter !== 'All') filtered = filtered.filter(q => q.category === activeFilter);
    if (searchQuery) filtered = filtered.filter(q => q.text.toLowerCase().includes(searchQuery) || q.author.toLowerCase().includes(searchQuery));
    browseGrid.innerHTML = filtered.map(createCard).join('');
}

// Render the Favorites Grid
function renderFavorites() {
    const faves = library.filter(q => q.liked);
    favoritesGrid.innerHTML = faves.length === 0 ? '<p style="color:var(--text-gray)">No favorites saved yet.</p>' : faves.map(createCard).join('');
}

// Update the main 'Today' screen quote
function updateTodayView() {
    const quote = library.find(q => q.id === currentQuoteId);
    if(!quote) return;
    todayText.innerText = `“${quote.text}”`;
    todayAuthor.innerText = `— ${quote.author}`;
    todayCategory.innerText = quote.category;
    
    if (quote.liked) {
        todayHeartIcon.innerHTML = heartFilled;
        todayHeartIcon.parentElement.style.color = 'var(--red-heart)';
    } else {
        todayHeartIcon.innerHTML = heartEmpty;
        todayHeartIcon.parentElement.style.color = 'var(--text-dark)';
    }
}

// Toggle Like functionality
window.toggleLike = function(id) {
    const quote = library.find(q => q.id === id);
    if (quote) {
        quote.liked = !quote.liked;
        if(quote.liked) savedLikes.push(id);
        else savedLikes = savedLikes.filter(savedId => savedId !== id);
        
        localStorage.setItem('quietude_likes', JSON.stringify(savedLikes));
        if (document.getElementById('view-browse').classList.contains('active')) renderBrowse();
        if (document.getElementById('view-favorites').classList.contains('active')) renderFavorites();
        if (currentQuoteId === id) updateTodayView();
    }
};

// Select a random quote for the 'Today' screen
function setRandomQuote() {
    let newId = currentQuoteId;
    while(newId === currentQuoteId) newId = library[Math.floor(Math.random() * library.length)].id;
    currentQuoteId = newId;
    updateTodayView();
}

// Event Listeners for actions
btnNext.addEventListener('click', setRandomQuote);

document.addEventListener('keydown', (e) => { 
    if (e.code === 'Space' && document.activeElement !== searchInput) { 
        e.preventDefault(); 
        setRandomQuote(); 
    } 
});

btnSaveToday.addEventListener('click', () => toggleLike(currentQuoteId));

btnCopy.addEventListener('click', () => {
    const quote = library.find(q => q.id === currentQuoteId);
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
    const originalHTML = btnCopy.innerHTML;
    btnCopy.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
    setTimeout(() => btnCopy.innerHTML = originalHTML, 2000);
});

// Category Filter Listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter');
        renderBrowse();
    });
});

// Search Input Listener
searchInput.addEventListener('input', (e) => { 
    searchQuery = e.target.value.toLowerCase(); 
    renderBrowse(); 
});

// Initialize the app on load
setRandomQuote();
renderBrowse();

// --- NEW SHARE BUTTON LOGIC ---
const btnShare = document.getElementById('btn-share');

if (btnShare) {
    btnShare.addEventListener('click', async () => {
        const quote = library.find(q => q.id === currentQuoteId);
        const shareData = {
            title: 'Quiétude Quote',
            text: `"${quote.text}" — ${quote.author}`
        };

        try {
            // Checks if the browser/device supports the native sharing menu
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback for older browsers or if running strictly offline
                alert("Native sharing isn't supported on this browser. Use the Copy button instead!");
            }
        } catch (err) {
            console.log('Error sharing:', err);
        }
    });
}
