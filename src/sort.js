import * as R from 'ramda'
import { conversationList } from './mock/conversation'

export const sortWithUpdateTimeAndConId = R.sortWith([
  R.descend(R.pathOr(Number.MAX_SAFE_INTEGER, ['updatedTime'])),
  R.descend(R.pathOr(Number.MAX_SAFE_INTEGER, ['conId']))
])

export const sortWithStickTopChangeTime = R.sortWith([
  R.descend(
    R.pathOr(Number.MAX_SAFE_INTEGER, ['settingInfo', 'userStickTopChangeTime'])
  )
])

const sortConversations = R.compose(
  R.apply(
    R.useWith(R.concat, [
      sortWithStickTopChangeTime,
      sortWithUpdateTimeAndConId
    ])
  ),
  R.partition(R.pathEq(['settingInfo', 'stickTop'], true))
)

const sortedConversations = sortConversations(conversationList)
console.log(sortedConversations)
console.log('hello')

