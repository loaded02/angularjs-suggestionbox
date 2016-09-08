angular.module('suggestions')
	.factory('Suggestions', [function(){
  var demoSuggestions = {
  posts: [
  {
  title: 'Free pizza at club meetings',
  upvotes: 15,
  comments: [
					{
						body: 'i cant wait',
						upvotes: 1
					},
					{
						body: 'i can eat two',
						upvotes: 3
					}
        ]
  },
  {
  title: 'End all club emails with Laffy Taffy jokes',
  upvotes: 9,
  comments: [
					{
						body: 'i cant wait',
						upvotes: 1
					},
					{
						body: 'i can eat two',
						upvotes: 3
					}
        ]
  },
  {
  title: 'Retrofit water fountain with Gatorade',
  upvotes: 7,
  comments: [
					{
						body: 'i cant wait',
						upvotes: 1
					},
					{
						body: 'i can eat two',
						upvotes: 3
					}
        ]
  },
  {
  title: 'Sing Bon Jovi\'s "Living on a Prayer" halfway through meetings',
  upvotes: 3,
  comments: [
					{
						body: 'i cant wait',
						upvotes: 1
					},
					{
						body: 'i can eat two',
						upvotes: 3
					}
        ]
  },
  ]
  };
  return demoSuggestions;
}]);
