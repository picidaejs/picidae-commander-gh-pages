// var nodeDebugArr = (process.env.NODE_DEBUG || '').split(',').filter(Boolean);
// process.env.NODE_DEBUG = nodeDebugArr.indexOf('gh-pages') > -1 ? nodeDebugArr.join(',') : nodeDebugArr.concat('gh-pages').join(',')

var nps = require('path')
var ghPages = require('gh-pages')
var moment = require('picidae/exports/moment')
var _console = require('picidae/exports/console')


module.exports = function (commander, opt, config) {
    var distRoot = nps.resolve(config.distRoot)
    return commander
        .command('gh-pages')
        .option('-r --repo')
        .action(function (opts) {
            opts = Object.assign({}, {branch: 'gh-pages', remote: 'origin'}, opt, opts)
            _console.log('path:', distRoot)
            _console.log('repo:', opts.repo)
            _console.log('branch:', opts.branch)
            _console.log('remote:', opts.remote)
            ghPages.publish(distRoot, {
                repo: opts.repo,
                branch: opts.branch,
                remote: opts.remote,
                message: 'picidae-commander-gh-pages: ' + moment().format('YYYY-MM-DD HH:mm:ss'),
            }, function (err) {
                if (err) {
                    _console.error(err);
                    process.exit(1);
                }
                _console.log('Published Done')
                process.exit(0);
            })
        })
}
