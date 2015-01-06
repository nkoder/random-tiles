'use strict';

describe('RandomTiles', function () {

    var $compile, $rootScope;

    beforeEach(module('randomTiles'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should write motivation phrase with given ending phrase', function () {
        var element = compileDirectiveForTerms('clean and simple');

        expect(element.html())
            .toContain('<p class="ng-binding">Let’s start from beginning and make things clean and simple</p>');
    });

    function compileDirectiveForTerms(phrase) {
        var element = $compile('<tiles-arrangement phrase="' + phrase + '"></tiles-arrangement>')($rootScope);
        $rootScope.$digest();
        return element;
    }

});