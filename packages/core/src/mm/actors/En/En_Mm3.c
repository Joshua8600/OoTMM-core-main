#include <combo.h>
#include <combo/item.h>

void EnMm3_GiveItem(Actor* this, PlayState* play, s16 gi, float a, float b)
{
    comboGiveItemNpc(this, play, gi, NPC_MM_POSTMAN_HEART_PIECE, a, b);
}

PATCH_CALL(0x80a6fec0, EnMm3_GiveItem);
