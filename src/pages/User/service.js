export default function getSumary(resultRepos) {
    return resultRepos.data.length > 1
        ? resultRepos.data.reduce((obj, cur, index, arr) => {
              const current = arr[index - 1];
              const language = [];
              const openIssuesCountObj = obj.openIssuesCount
                  ? obj.openIssuesCount
                  : 0;
              const lastObj = obj.arrayLanguage ? obj.arrayLanguage : [];
              const atualLang = lastObj.filter(
                  (l) => l.name === current.language
              );
              language.push({
                  name:
                      atualLang && atualLang[0]
                          ? atualLang[0].name
                          : current.language,
                  counts:
                      atualLang && atualLang[0] ? atualLang[0].counts + 1 : 1,
              });
              const size = +obj.size + +current.size;
              const openIssuesCount =
                  +openIssuesCountObj + +current.open_issues_count;
              return {
                  size,
                  arrayLanguage: [
                      ...language,
                      ...lastObj.filter((l) => l.name !== current.language),
                  ],
                  openIssuesCount,
              };
          })
        : {
              size: resultRepos.data[0] ? resultRepos.data[0].size : 0,
              arrayLanguage: [
                  {
                      name: resultRepos.data[0]
                          ? resultRepos.data[0].language
                          : '',
                      counts: 1,
                  },
              ],
              openIssuesCount: resultRepos.data[0]
                  ? resultRepos.data[0].open_issues_count
                  : 0,
          };
}
