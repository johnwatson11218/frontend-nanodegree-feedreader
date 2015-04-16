/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // This test loops through each feed and ensures that the URL is defined and not empty
        it('ensures that each feed has a url property that is not empty', function () {

            allFeeds.forEach(
                function (feed, i, a) {
                    expect( feed.url ).toBeDefined();
                    expect( feed.url ).not.toBeNull();
                });
        });

        // This test loops through each feed and ensures that the name is defined and not empty
        it('ensures that each feed has a name property that is not empty ', function () {
              allFeeds.forEach(
                function (feed, i, a) {
                    expect( feed.name ).toBeDefined();
                    expect( feed.name ).not.toBeNull();
                });
        });
    });



    describe('The menu', function () {


        // test that the menu is hidden by default
        it('ensures that the menu is hidden by default' , function () {
            expect( $('body' ).hasClass( "menu-hidden")).toBe(true);
        });


        // test that clicking the menu toggles its visibility
        it('ensures that the menu hidding is toggled when clicked ' , function () {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect( $('body' ).hasClass( "menu-hidden")).toBe(false);
            menuIcon.click();
            expect( $('body' ).hasClass( "menu-hidden")).toBe(true);
        });
    });

    describe('Initial Entries', function () {
        /*
          The next two tests work together to ensuer that when the loadFeed function is called that
          it actually returns some content to the .feed container on the page.
          It uses the asyc capabilities of jasmine to wait until the ajax call comes back before finishing up.
        */

        // this var stores the html of the first feed that the test loads
         var initialFeed = -1;
         // this is used to pick out different feeds for the different tests
         var feedNumber = 0;

         // before each of the following tests clear out the feed and call the loadFeed function with a different param
         // each time
        beforeEach( function ( done ) {
            $('.feed').empty();

            // if we have already loaded a feed, indicated by the initialFeed have a non-default value
            // then try and find a different feed in the allFeeds array
            if( initialFeed != -1 ){
                // use this var to see how far in to the allFeeds we have to go to find a different feed
                var offset = 0
                while( allFeeds[feedNumber].url === allFeeds[feedNumber + offset].url )
                    offset++;
                feedNumber += offset;
            }
            loadFeed( feedNumber, done );

        });

        // this test checks to make sure thath something is loaded on the page,
        // note it saves off the contents for use in the verification of the next test
        it('ensures that the feed loaded ' , function () {
            expect ( $('.feed' ).find( '.entry').length  > 0 ).toBe(true);
            // save this feed for later
            initialFeed = $('.feed' ).html();

        });


        // this test makes sure that when a new feed is loaded that the contents on the page are
        // actually different.
        it('ensures that the feed actually changes ', function () {
            var currentFeed = $('.feed' ).html();
            expect( currentFeed === initialFeed ).toBe( false );
        });
    });


}());




















     /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */












